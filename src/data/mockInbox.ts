export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  timestamp: string;
  category?: "Important" | "Newsletter" | "Spam" | "To-Do";
  actionItems?: Array<{ task: string; deadline?: string }>;
  isRead: boolean;
}

export const mockEmails: Email[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah.johnson@techcorp.com",
    subject: "Q4 Strategy Meeting - Action Required",
    body: "Hi Team,\n\nWe need to schedule our Q4 strategy meeting by next Friday. Please review the attached slides and come prepared with your department goals. We'll need final budget proposals submitted by December 1st.\n\nKey items to discuss:\n- Budget allocation for 2024\n- Team expansion plans\n- New product roadmap\n\nPlease confirm your availability for next week.\n\nBest regards,\nSarah",
    timestamp: new Date("2024-11-20T09:30:00").toISOString(),
    category: "Important",
    isRead: false,
  },
  {
    id: "2",
    sender: "Marketing Weekly",
    senderEmail: "newsletter@marketingweekly.com",
    subject: "Your Weekly Marketing Digest - Top 10 Trends",
    body: "This week in marketing:\n\n1. AI-powered content creation is revolutionizing the industry\n2. Social media algorithms have changed again\n3. Email marketing best practices for 2024\n\n[Read more...]\n\nUnsubscribe | View in browser",
    timestamp: new Date("2024-11-20T08:15:00").toISOString(),
    category: "Newsletter",
    isRead: true,
  },
  {
    id: "3",
    sender: "IT Support",
    senderEmail: "it-support@company.com",
    subject: "Security Alert: Password Reset Required",
    body: "Dear User,\n\nAs part of our quarterly security audit, all users must reset their passwords by November 25th. Please use the company portal to update your credentials.\n\nPassword requirements:\n- Minimum 12 characters\n- Must include uppercase, lowercase, numbers, and symbols\n- Cannot reuse previous 5 passwords\n\nFailure to comply will result in account lockout.\n\nIT Security Team",
    timestamp: new Date("2024-11-19T16:45:00").toISOString(),
    category: "Important",
    isRead: false,
  },
  {
    id: "4",
    sender: "John Doe",
    senderEmail: "john.doe@partner.com",
    subject: "Re: Project Proposal Review",
    body: "Thanks for sharing the proposal. I've reviewed it and have a few questions:\n\n1. What's the timeline for Phase 2?\n2. Can we adjust the budget for the design phase?\n3. Do you have availability for a call next Tuesday?\n\nLooking forward to discussing this further.\n\nJohn",
    timestamp: new Date("2024-11-19T14:20:00").toISOString(),
    category: "To-Do",
    isRead: false,
  },
  {
    id: "5",
    sender: "Deals & Offers",
    senderEmail: "offers@randomshop.com",
    subject: "🎉 50% OFF EVERYTHING - Limited Time Only!!!",
    body: "MEGA SALE ALERT!\n\nGet 50% off on ALL items! Click here now before it's too late!\n\n[SHOP NOW] [SHOP NOW] [SHOP NOW]\n\nThis offer expires in 24 hours!!! Don't miss out!!!\n\nClick here to unsubscribe (but why would you?)",
    timestamp: new Date("2024-11-19T11:30:00").toISOString(),
    category: "Spam",
    isRead: true,
  },
  {
    id: "6",
    sender: "HR Department",
    senderEmail: "hr@company.com",
    subject: "Annual Review Forms Due Next Week",
    body: "Hello,\n\nThis is a reminder that annual self-review forms are due by November 27th. Please complete the following:\n\n1. Self-assessment form\n2. Goal setting for 2024\n3. Training needs assessment\n\nSubmit all forms through the HR portal. Late submissions may delay your review meeting.\n\nBest,\nHR Team",
    timestamp: new Date("2024-11-18T10:00:00").toISOString(),
    category: "To-Do",
    isRead: false,
  },
  {
    id: "7",
    sender: "Tech News Daily",
    senderEmail: "news@technewsdaily.com",
    subject: "Breaking: New AI Model Released",
    body: "In today's top tech news:\n\n🚀 Major tech company releases new AI model\n💻 Software update fixes critical security flaw\n📱 New smartphone features leaked\n\nRead the full stories on our website.\n\nStay informed with Tech News Daily!",
    timestamp: new Date("2024-11-18T07:00:00").toISOString(),
    category: "Newsletter",
    isRead: true,
  },
  {
    id: "8",
    sender: "Client Services",
    senderEmail: "client@bigclient.com",
    subject: "Urgent: Production Issue Needs Attention",
    body: "Hi,\n\nWe're experiencing a critical issue in production that's affecting our users. The login system appears to be down since 2 PM today.\n\nCan you please investigate ASAP and provide an ETA for the fix? This is impacting approximately 5,000 users.\n\nPlease call me as soon as you see this.\n\nThanks,\nClient Services Team",
    timestamp: new Date("2024-11-17T15:30:00").toISOString(),
    category: "Important",
    isRead: false,
  },
  {
    id: "9",
    sender: "Meeting Scheduler",
    senderEmail: "noreply@calendar.com",
    subject: "Meeting Invitation: Product Demo",
    body: "You've been invited to a meeting:\n\nProduct Demo Session\nDate: November 24, 2024\nTime: 2:00 PM - 3:00 PM\nLocation: Conference Room B / Zoom\n\nAgenda:\n- Product walkthrough\n- Q&A session\n- Next steps discussion\n\nPlease accept or decline this invitation.\n\n[Accept] [Decline] [Tentative]",
    timestamp: new Date("2024-11-17T09:15:00").toISOString(),
    category: "To-Do",
    isRead: false,
  },
  {
    id: "10",
    sender: "Fitness App",
    senderEmail: "motivation@fitnessapp.com",
    subject: "You're crushing it! Your weekly progress report",
    body: "Great job this week! 🎉\n\nYour stats:\n- 5 workouts completed\n- 2,500 calories burned\n- 12km distance covered\n\nKeep up the great work! Your consistency is paying off.\n\n[View Full Report]",
    timestamp: new Date("2024-11-16T19:00:00").toISOString(),
    category: "Newsletter",
    isRead: true,
  },
  {
    id: "11",
    sender: "Finance Team",
    senderEmail: "finance@company.com",
    subject: "Expense Report Submission Deadline",
    body: "Dear Team,\n\nPlease submit all October expense reports by November 22nd for timely reimbursement. Include all receipts and proper documentation.\n\nSubmit via the finance portal.\n\nThank you,\nFinance",
    timestamp: new Date("2024-11-16T11:45:00").toISOString(),
    category: "To-Do",
    isRead: true,
  },
  {
    id: "12",
    sender: "Unknown Sender",
    senderEmail: "winner@lottery-notification.xyz",
    subject: "CONGRATULATIONS!!! You've Won $1,000,000!!!",
    body: "Dear Lucky Winner,\n\nYou have been selected as the winner of our international lottery! To claim your $1,000,000 prize, simply:\n\n1. Reply with your bank account details\n2. Send processing fee of $500\n3. Provide your social security number\n\nACT NOW before this offer expires!\n\nClaim your prize TODAY!!!",
    timestamp: new Date("2024-11-15T23:30:00").toISOString(),
    category: "Spam",
    isRead: false,
  },
  {
    id: "13",
    sender: "Dr. Emily Chen",
    senderEmail: "emily.chen@research.edu",
    subject: "Collaboration Opportunity - Research Project",
    body: "Hello,\n\nI came across your work on AI applications and I'm impressed. I'm leading a research project on machine learning ethics and would love to explore potential collaboration.\n\nWould you be interested in a brief call to discuss? I'm available most afternoons next week.\n\nBest regards,\nDr. Emily Chen",
    timestamp: new Date("2024-11-15T13:20:00").toISOString(),
    category: "Important",
    isRead: false,
  },
  {
    id: "14",
    sender: "Project Management Tool",
    senderEmail: "notifications@pm-tool.com",
    subject: "Daily Digest: 3 tasks due today",
    body: "Good morning!\n\nYou have 3 tasks due today:\n\n1. Review pull request #234\n2. Update project documentation\n3. Schedule team sync meeting\n\n2 new comments on your tasks.\n\n[View All Tasks]",
    timestamp: new Date("2024-11-15T08:00:00").toISOString(),
    category: "To-Do",
    isRead: false,
  },
  {
    id: "15",
    sender: "Industry Insights",
    senderEmail: "insights@industry-news.com",
    subject: "Monthly Industry Report - November 2024",
    body: "Your monthly industry insights are here!\n\nThis month's highlights:\n- Market trends analysis\n- Competitor activity report\n- Emerging technologies overview\n\nDownload the full 45-page report.\n\nIndustry Insights Team",
    timestamp: new Date("2024-11-14T17:00:00").toISOString(),
    category: "Newsletter",
    isRead: true,
  },
];

export const defaultPrompts = {
  categorization: `Categorize emails into one of these categories: Important, Newsletter, Spam, or To-Do.

Rules:
- Important: Urgent matters, critical business updates, or time-sensitive requests from known contacts
- To-Do: Emails that contain direct action items or requests requiring user action
- Newsletter: Marketing content, digests, automated updates, or promotional content
- Spam: Suspicious emails, lottery/prize notifications, requests for personal information, or obvious scams

Respond with just the category name.`,
  
  actionItem: `Extract action items from the email. Look for:
- Tasks explicitly requested
- Deadlines mentioned
- Meeting scheduling requests
- Form submissions required
- Reviews or approvals needed

Respond in JSON format:
{
  "tasks": [
    {"task": "description of task", "deadline": "date if mentioned or null"}
  ]
}

If no action items found, respond with empty tasks array.`,
  
  autoReply: `Draft a professional email reply based on the email content.

Guidelines:
- Match the tone of the original email (formal/casual)
- Be concise and professional
- If it's a meeting request, acknowledge and ask for agenda
- If it's a task request, confirm understanding and provide estimated timeline
- For questions, provide helpful information or indicate when you'll follow up

Keep the reply under 150 words.`,
};
