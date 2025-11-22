import { Email } from "@/data/mockInbox";
import { cn } from "@/lib/utils";
import { Mail, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (emailId: string) => void;
}

const categoryColors = {
  Important: "bg-category-important/10 text-category-important border-category-important/20",
  Newsletter: "bg-category-newsletter/10 text-category-newsletter border-category-newsletter/20",
  Spam: "bg-category-spam/10 text-category-spam border-category-spam/20",
  "To-Do": "bg-category-todo/10 text-category-todo border-category-todo/20",
};

export const EmailList = ({ emails, selectedEmailId, onSelectEmail }: EmailListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="divide-y divide-border">
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => onSelectEmail(email.id)}
          className={cn(
            "w-full text-left p-4 hover:bg-muted/50 transition-colors",
            selectedEmailId === email.id && "bg-muted",
            !email.isRead && "bg-primary/5"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {email.isRead ? (
                <MailOpen className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Mail className="h-4 w-4 text-primary" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={cn(
                  "font-medium truncate",
                  !email.isRead && "font-semibold"
                )}>
                  {email.sender}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(email.timestamp)}
                </span>
              </div>
              
              <div className="text-sm font-medium truncate mb-1">
                {email.subject}
              </div>
              
              <div className="text-sm text-muted-foreground truncate mb-2">
                {email.body.split("\n")[0]}
              </div>
              
              {email.category && (
                <Badge variant="outline" className={cn("text-xs", categoryColors[email.category])}>
                  {email.category}
                </Badge>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
