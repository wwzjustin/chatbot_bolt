import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex w-full mb-4 justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="flex max-w-[80%] gap-3">
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-muted-foreground text-white">
          <Bot className="h-4 w-4" />
        </div>
        <div className="rounded-lg px-4 py-3 bg-muted mr-2 shadow-md">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
}