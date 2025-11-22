import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RotateCcw } from "lucide-react";
import { defaultPrompts } from "@/data/mockInbox";
import { toast } from "sonner";

export const PromptManager = () => {
  const [prompts, setPrompts] = useState(defaultPrompts);

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success("Prompts saved successfully!");
  };

  const handleReset = () => {
    setPrompts(defaultPrompts);
    toast.info("Prompts reset to defaults");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Prompt Configuration</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Customize how the AI agent processes emails
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="categorization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categorization">Categorization</TabsTrigger>
            <TabsTrigger value="action">Action Items</TabsTrigger>
            <TabsTrigger value="reply">Auto-Reply</TabsTrigger>
          </TabsList>

          <TabsContent value="categorization" className="mt-4">
            <Card className="p-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cat-prompt" className="text-base font-semibold">
                    Email Categorization Prompt
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    This prompt guides how emails are categorized into Important, Newsletter, Spam, or To-Do
                  </p>
                </div>
                <Textarea
                  id="cat-prompt"
                  value={prompts.categorization}
                  onChange={(e) =>
                    setPrompts({ ...prompts, categorization: e.target.value })
                  }
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-2">Tips:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Be specific about each category's criteria</li>
                    <li>• Include examples of what belongs in each category</li>
                    <li>• Define edge cases and how to handle them</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="action" className="mt-4">
            <Card className="p-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="action-prompt" className="text-base font-semibold">
                    Action Item Extraction Prompt
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Define how the AI extracts tasks and deadlines from emails
                  </p>
                </div>
                <Textarea
                  id="action-prompt"
                  value={prompts.actionItem}
                  onChange={(e) =>
                    setPrompts({ ...prompts, actionItem: e.target.value })
                  }
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-2">Tips:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Specify the JSON format expected</li>
                    <li>• Define what qualifies as an action item</li>
                    <li>• Include how to extract and format deadlines</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reply" className="mt-4">
            <Card className="p-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="reply-prompt" className="text-base font-semibold">
                    Auto-Reply Draft Prompt
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Guide how the AI drafts email replies
                  </p>
                </div>
                <Textarea
                  id="reply-prompt"
                  value={prompts.autoReply}
                  onChange={(e) =>
                    setPrompts({ ...prompts, autoReply: e.target.value })
                  }
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-2">Tips:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Define the tone and style for replies</li>
                    <li>• Include guidelines for different email types</li>
                    <li>• Specify response length and format</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
