import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_OPENAI_API_KEY is not set in environment variables');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: Array<{ role: 'user' | 'assistant', content: string }>) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}