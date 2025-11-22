import { Email } from "@/data/mockInbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reply, Forward, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailViewerProps {
  email: Email;
  onReply?: () => void;
}

const categoryColors = {
  Important: "bg-category-important/10 text-category-important border-category-important/20",
  Newsletter: "bg-category-newsletter/10 text-category-newsletter border-category-newsletter/20",
  Spam: "bg-category-spam/10 text-category-spam border-category-spam/20",
  "To-Do": "bg-category-todo/10 text-category-todo border-category-todo/20",
};

export const EmailViewer = ({ email, onReply }: EmailViewerProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{email.subject}</h2>
            {email.category && (
              <Badge variant="outline" className={cn("text-xs", categoryColors[email.category])}>
                {email.category}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{email.sender}</div>
            <div className="text-sm text-muted-foreground">{email.senderEmail}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(email.timestamp)}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onReply}>
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{email.body}</div>
        </div>

        {email.actionItems && email.actionItems.length > 0 && (
          <Card className="mt-6 p-4 bg-category-todo/5 border-category-todo/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-category-todo">📋</span> Action Items
            </h3>
            <ul className="space-y-2">
              {email.actionItems.map((item, index) => (
                <li key={index} className="text-sm">
                  <div className="font-medium">{item.task}</div>
                  {item.deadline && (
                    <div className="text-muted-foreground text-xs">
                      Due: {item.deadline}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};
