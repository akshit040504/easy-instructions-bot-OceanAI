import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Bot, User, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface EmailAgentProps {
  selectedEmailSubject?: string;
  selectedEmailBody?: string;
}

export const EmailAgent = ({ selectedEmailSubject, selectedEmailBody }: EmailAgentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: selectedEmailSubject
        ? `I'm here to help you with "${selectedEmailSubject}". What would you like to know?`
        : "Hello! I'm your Email Agent. I can help you summarize emails, extract tasks, draft replies, and more. What can I help you with?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
    
    try {
      const contextMessages = messages
        .filter(m => m.role !== "assistant" || m.id !== "1") // Remove initial greeting
        .map(m => ({ role: m.role, content: m.content }));

      // Build messages array with email context
      let messagesToSend = [...contextMessages, { role: userMessage.role, content: userMessage.content }];
      
      // Add email context if available (prepend to the user's first message)
      if (selectedEmailSubject && selectedEmailBody && contextMessages.length === 0) {
        messagesToSend = [{
          role: "user" as const,
          content: `I'm looking at this email:\n\nSubject: ${selectedEmailSubject}\n\nBody:\n${selectedEmailBody}\n\n${userMessage.content}`
        }];
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
          return;
        }
        if (resp.status === 402) {
          toast.error("AI credits depleted. Please add credits to continue.");
          return;
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      // Create initial assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = assistantContent;
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      toast.error("Failed to get AI response. Please try again.");
      setMessages(prev => prev.slice(0, -1)); // Remove empty assistant message
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Email Agent
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Ask questions, get summaries, or draft replies
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 md:gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                </div>
              )}
              
              <Card className={`p-2 md:p-3 max-w-[85%] md:max-w-[80%] ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                <p className="text-xs md:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === "user" 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>

              {message.role === "user" && (
                <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-3 w-3 md:h-4 md:w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 md:gap-3 justify-start">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary animate-pulse" />
              </div>
              <Card className="p-2 md:p-3 bg-muted">
                <p className="text-xs md:text-sm text-muted-foreground">Thinking...</p>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3 md:p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about this email, request a summary, or draft a reply..."
            className="min-h-[50px] md:min-h-[60px] resize-none text-sm md:text-base"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading} 
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 hidden md:block">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
