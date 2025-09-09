import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8 border-2 border-primary/50">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-md',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground'
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function TypingIndicator() {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-8 w-8 border-2 border-primary/50">
                <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
            <div className="max-w-[75%] rounded-lg p-3 text-sm bg-card text-card-foreground shadow-md flex items-center space-x-1">
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
            </div>
        </div>
    )
}
