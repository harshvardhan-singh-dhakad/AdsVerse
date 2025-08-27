
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Loader2, Send, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { adsVerseAssistant, AdsVerseAssistantOutput } from "@/ai/flows/adsverse-assistant-flow";

type ActionButton = {
  label: string;
  href: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: ActionButton[];
};

type AiChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AiChatDialog({ open, onOpenChange }: AiChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response: AdsVerseAssistantOutput = await adsVerseAssistant(input);
      const assistantMessage: Message = { 
          role: "assistant", 
          content: response.responseText,
          actions: response.actions,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, but I'm having trouble connecting to my brain right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg flex flex-col h-[70vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Service Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about AdsVerse's services!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-8">
                    <p>Welcome! How can I help you learn about our services today?</p>
                    <p className="mt-2">For example, you could ask: <em className="text-foreground/80">"What's included in your SEO package?"</em> or <em className="text-foreground/80">"How can I contact you?"</em></p>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div className={cn("flex items-start gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5" />
                    </div>
                    )}
                    {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                    )}
                    <div
                    className={cn(
                        "p-3 rounded-lg max-w-sm",
                        message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted"
                    )}
                    >
                        <p className="prose dark:prose-invert prose-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                </div>

                 {message.role === 'assistant' && message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 ml-11">
                        {message.actions.map((action, actionIndex) => (
                            <Button key={actionIndex} size="sm" variant="outline" asChild>
                                <Link href={action.href} target="_blank" rel="noopener noreferrer">
                                    {action.label.toLowerCase().includes('call') && <Phone className="mr-2 h-4 w-4" />}
                                    {action.label.toLowerCase().includes('chat') && <MessageSquare className="mr-2 h-4 w-4" />}
                                    {action.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                 )}

              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-lg bg-muted flex items-center">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              autoComplete="off"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
