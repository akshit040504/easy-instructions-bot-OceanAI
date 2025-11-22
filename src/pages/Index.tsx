import { useState } from "react";
import { mockEmails } from "@/data/mockInbox";
import { EmailList } from "@/components/EmailList";
import { EmailViewer } from "@/components/EmailViewer";
import { EmailAgent } from "@/components/EmailAgent";
import { PromptManager } from "@/components/PromptManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Bot, 
  Settings, 
  Inbox, 
  Tag,
  Search,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [emails] = useState(mockEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(emails[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || email.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = {
    Important: emails.filter(e => e.category === "Important").length,
    Newsletter: emails.filter(e => e.category === "Newsletter").length,
    Spam: emails.filter(e => e.category === "Spam").length,
    "To-Do": emails.filter(e => e.category === "To-Do").length,
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-bold">Email Productivity Agent</h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">AI-Powered Email Management</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Sync Inbox</span>
            <span className="sm:hidden">Sync</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-border bg-sidebar flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Inbox</span>
              <Badge variant="secondary" className="ml-auto">
                {emails.length}
              </Badge>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Categories</span>
            </div>
            <div className="space-y-1">
              <Button
                variant={selectedCategory === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Emails
                <Badge variant="outline" className="ml-auto">
                  {emails.length}
                </Badge>
              </Button>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  <Badge variant="outline" className="ml-auto">
                    {count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Email List */}
        <div className="w-full sm:w-72 md:w-80 border-r border-border bg-card flex flex-col">
          <div className="p-3 md:p-4 border-b border-border">
            <h2 className="font-semibold text-sm md:text-base">
              {selectedCategory || "All Emails"} ({filteredEmails.length})
            </h2>
          </div>
          <div className="flex-1 overflow-auto">
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmailId}
              onSelectEmail={setSelectedEmailId}
            />
          </div>
        </div>

        {/* Mobile View - Show chat by default, email list on demand */}
        <div className="flex-1 md:hidden bg-card overflow-auto">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              <div className="border-b p-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEmailId(null)}
                >
                  ← Back
                </Button>
                <span className="text-sm font-medium truncate">{selectedEmail.subject}</span>
              </div>
              <div className="flex-1 overflow-auto">
                <EmailViewer email={selectedEmail} />
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="border-b p-3">
                <h2 className="font-semibold text-sm">AI Email Assistant</h2>
              </div>
              <EmailAgent 
                selectedEmailSubject={undefined}
                selectedEmailBody={undefined}
              />
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          {/* Email Viewer */}
          <div className="flex-1 border-r border-border bg-card overflow-auto">
            {selectedEmail ? (
              <EmailViewer email={selectedEmail} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an email to view</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Agent & Prompts */}
          <div className="w-80 lg:w-96 bg-card">
            <Tabs defaultValue="agent" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                <TabsTrigger value="agent" className="gap-2">
                  <Bot className="h-4 w-4" />
                  Agent
                </TabsTrigger>
                <TabsTrigger value="prompts" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Prompts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="agent" className="flex-1 m-0 overflow-hidden">
                <EmailAgent 
                  selectedEmailSubject={selectedEmail?.subject}
                  selectedEmailBody={selectedEmail?.body}
                />
              </TabsContent>
              <TabsContent value="prompts" className="flex-1 m-0 overflow-hidden">
                <PromptManager />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
