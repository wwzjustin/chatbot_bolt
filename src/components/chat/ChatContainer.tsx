import { useState, useEffect, useRef } from 'react';
import { Message, ChatState } from '@/types/chat';
import { getChatCompletion } from '@/lib/openai';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, MessageSquare } from 'lucide-react';

export function ChatContainer() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isLoading]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const messagesForAPI = [...chatState.messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await getChatCompletion(messagesForAPI);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  };

  const dismissError = () => {
    setChatState(prev => ({ ...prev, error: null }));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4">
            {chatState.messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Start a conversation
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything! I'm here to help with questions, brainstorming, coding, writing, and more.
                </p>
              </div>
            )}
            
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {chatState.isLoading && <TypingIndicator />}
            
            {chatState.error && (
              <div className="mb-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{chatState.error}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={dismissError}
                      className="h-auto p-1 text-destructive-foreground hover:text-destructive-foreground"
                    >
                      Dismiss
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={chatState.isLoading}
      />
    </div>
  );
}