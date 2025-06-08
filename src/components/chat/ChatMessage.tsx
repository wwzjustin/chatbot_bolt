import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[80%] gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-white",
          isUser ? "bg-primary" : "bg-muted-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={cn(
          "rounded-lg px-4 py-3 text-sm leading-relaxed shadow-md",
          isUser 
            ? "bg-primary text-primary-foreground ml-2" 
            : "bg-muted mr-2"
        )}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-primary-foreground" : "text-muted-foreground"
          )}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}