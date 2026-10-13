// Marketing copy for the homepage sections. Kept as data so the site, the
// README and the LinkedIn kit can be checked against one another.

export const highlights = [
  { title: '90-day program structure', body: 'Every member follows a 13-week plan with phases, milestones and a day-90 review.' },
  { title: 'Automated daily check-ins', body: 'Session reminders, post-workout and habit check-ins sent on each member’s schedule.' },
  { title: 'Coach-approved changes', body: 'AI drafts plan adjustments from member replies; coaches approve before anything changes.' },
  { title: 'Early drop-off signals', body: 'Missed sessions and silent members are flagged while there is still time to step in.' },
]

export const problem = {
  points: [
    {
      title: 'Follow-up does not scale',
      body: 'A coach with 60 clients cannot message each one after every session. Follow-up drifts to whoever replies first, and quiet members disappear.',
    },
    {
      title: 'Plans are static',
      body: 'A PDF program written in week one does not know a member is travelling, injured or short on time. When the plan stops fitting, members stop showing up.',
    },
    {
      title: 'Drop-off is noticed too late',
      body: 'Most coaches find out a member has stopped when the renewal does not happen. By then the habit — and usually the client — is gone.',
    },
  ],
  consequences: [
    'Members who signed up motivated stop training in weeks 3–6.',
    'Coaches spend evenings in WhatsApp threads and spreadsheets instead of coaching.',
    'Gyms and programs lose renewals they had every chance of keeping.',
  ],
  example:
    'A studio runs a 12-week transformation challenge for 80 members. Two coaches track attendance in a spreadsheet and check messages between classes. By week 4, a quarter of the group has gone quiet, and nobody can say which members were struggling with time, motivation or a niggling injury.',
}

export const features = [
  {
    id: 'intake',
    name: 'Guided intake and readiness screening',
    body: 'Members answer a conversational intake: goal, training location, experience, available days, session length and a readiness questionnaire. Answers that suggest medical input route the member to a professional before a plan is created.',
    benefit: 'Plans start at the right intensity and coaches stop chasing intake forms.',
    stage: 'Intake',
    visual: 'intake',
  },
  {
    id: 'plans',
    name: 'Personalised 90-day plans from your templates',
    body: 'JiXora builds each member’s 13-week plan from the coach’s own program templates, adjusting exercise selection, volume and schedule to the intake answers and available equipment.',
    benefit: 'Every member gets an individual plan without the coach writing one from scratch.',
    stage: 'Plan',
    visual: 'timeline',
  },
  {
    id: 'checkins',
    name: 'Automated check-ins that read replies',
    body: 'Morning reminders, post-session check-ins and weekly habit questions go out on each member’s timetable. Free-text replies — “travelling this week”, “knee is sore” — are interpreted and attached to the member record.',
    benefit: 'Every member hears from the program every day, without a coach typing each message.',
    stage: 'Follow up',
    visual: 'chat',
  },
  {
    id: 'adapt',
    name: 'Adaptive sessions with coach approval',
    body: 'When a reply changes what a member can do, JiXora drafts a specific adjustment — a bodyweight swap, a shorter session, a lighter week — with the reason attached. Reported pain is never auto-progressed.',
    benefit: 'Plans keep fitting real life, and coaches stay in control of every change.',
    stage: 'Adapt',
    visual: 'diff',
  },
  {
    id: 'risk',
    name: 'Drop-off risk flags',
    body: 'Adherence, reply patterns and missed-session streaks combine into a simple status for each member: on track, slipping or at risk — with the reason in plain language.',
    benefit: 'Coaches spend their limited time on the members most likely to quit.',
    stage: 'Review',
    visual: 'risk',
  },
  {
    id: 'queue',
    name: 'Coach review queue',
    body: 'Suggested changes, safety flags and re-engagement messages land in one queue. Approve, edit with a note or dismiss — every decision is logged on the member timeline.',
    benefit: 'A day’s worth of member admin becomes a ten-minute review.',
    stage: 'Review',
    visual: 'queue',
  },
  {
    id: 'habits',
    name: 'Nutrition and habit check-ins',
    body: 'Simple, judgement-free questions on meals, hydration, sleep and steps sit alongside training. Trends appear on the member record next to session adherence.',
    benefit: 'Coaches see the habits behind the results without asking members to log every meal.',
    stage: 'Follow up',
    visual: 'habits',
  },
]

export const steps = [
  {
    title: 'Set up your programs',
    body: 'Add your program templates, coaching tone and check-in schedule. JiXora uses them as the rules every plan is built from.',
    tag: 'Coach · once',
  },
  {
    title: 'Members complete the intake',
    body: 'Each member gets a link to the guided intake and readiness questionnaire. It is designed to be finished on a phone in one sitting.',
    tag: 'Member · day 0',
  },
  {
    title: 'JiXora builds the 90-day plan',
    body: 'A personalised 13-week plan is generated from your template and the member’s answers, ready for coach sign-off.',
    tag: 'AI · minutes',
  },
  {
    title: 'Daily check-ins keep it on track',
    body: 'Reminders and check-ins go out automatically. Replies update adherence, habits and risk status in real time.',
    tag: 'Automatic · days 1–90',
  },
  {
    title: 'Coaches review and act',
    body: 'Approve drafted changes, message members who are slipping and run the day-90 review with the full history in one place.',
    tag: 'Coach · minutes a day',
  },
]

export const audiences = [
  {
    id: 'coaches',
    name: 'Independent and online coaches',
    who: 'Personal trainers coaching 20–100 clients in person, online or both.',
    problem: 'Programming and daily follow-up eat the hours that should go to coaching and finding new clients.',
    use: 'Build plans from their own templates, let check-ins run automatically and work through the review queue once a day.',
    benefit: 'Take on more clients without the quality of follow-up dropping.',
  },
  {
    id: 'gyms',
    name: 'Gyms and boutique studios',
    who: 'Facilities running onboarding programs, challenges and small-group training with several coaches.',
    problem: 'New members join motivated, then fade before the habit forms — and the front desk only notices at cancellation.',
    use: 'Enrol every new member in a 90-day starter program, share one coach console and route at-risk members to the right coach.',
    benefit: 'A structured first 90 days for every member, visible to the whole coaching team.',
  },
  {
    id: 'wellness',
    name: 'Corporate wellness programs',
    who: 'Wellness providers and HR teams running fitness programs for employees.',
    problem: 'Participation is high at launch and hard to sustain, and sponsors want to see engagement, not just sign-ups.',
    use: 'Run cohort-based 90-day programs with home and gym options, automated check-ins and aggregate engagement reporting.',
    benefit: 'Sustained participation and clear engagement reporting for program sponsors.',
  },
  {
    id: 'programs',
    name: 'Digital fitness programs',
    who: 'Coaches and brands that sell fixed-length transformation or training programs online.',
    problem: 'Pre-written programs cannot respond to individual buyers, so completion rates and reviews suffer.',
    use: 'Turn an existing program into personalised plans with daily accountability, without hiring more coaches.',
    benefit: 'More buyers finish the program they paid for.',
  },
]

export const awsIntro =
  'JiXora’s workload is a daily loop: members check in, the platform interprets their replies, plans adapt and coaches review what changed. The platform is architected as a serverless application on Amazon Web Services so that each step of that loop maps to a managed service — scheduled check-ins for every member, an AI layer that reads free-text replies and drafts plan changes, and storage designed for personal fitness records — and scales with the number of members rather than the number of servers.'

export const awsPipeline = [
  {
    stage: 'Member intake',
    services: ['Amazon Cognito', 'Amazon API Gateway'],
    role: 'Authenticates coaches and members and receives intake answers and check-in replies through a secured API.',
  },
  {
    stage: 'Secure storage',
    services: ['Amazon DynamoDB', 'Amazon S3'],
    role: 'Holds member profiles, 90-day plans and check-in history, plus program templates and exported plan documents.',
  },
  {
    stage: 'Scheduling & processing',
    services: ['Amazon EventBridge Scheduler', 'AWS Lambda'],
    role: 'Triggers each member’s check-ins on their own timetable and processes every reply into adherence and risk status.',
  },
  {
    stage: 'AI intelligence',
    services: ['Amazon Bedrock'],
    role: 'Generates plans from coach templates, interprets free-text replies and drafts adjustments for coach approval.',
  },
  {
    stage: 'Coach & member experience',
    services: ['Amazon SES', 'Amazon CloudWatch'],
    role: 'Delivers check-in and summary emails and monitors scheduled jobs and API health behind the coach console.',
  },
]

export const awsServices = [
  { name: 'Amazon Cognito', purpose: 'Provides sign-in and role separation for coaches, workspace admins and members.' },
  { name: 'Amazon API Gateway', purpose: 'Exposes the secured API used by the member intake, check-in replies and the coach console.' },
  { name: 'AWS Lambda', purpose: 'Runs plan generation, check-in processing, adherence scoring and the website’s lead-intake function.' },
  { name: 'Amazon DynamoDB', purpose: 'Stores member profiles, plans, check-in history and review-queue decisions with per-workspace partitioning.' },
  { name: 'Amazon S3', purpose: 'Provides object storage for coach program templates, exported plan PDFs and workspace assets.' },
  { name: 'Amazon EventBridge Scheduler', purpose: 'Schedules each member’s reminders and check-ins in their own time zone across the 90 days.' },
  { name: 'Amazon Bedrock', purpose: 'Supplies the foundation models that build plans from templates, interpret replies and draft coach-reviewed changes.' },
  { name: 'Amazon SES', purpose: 'Sends check-in emails, weekly coach summaries and website enquiry notifications.' },
  { name: 'Amazon CloudWatch', purpose: 'Collects logs, metrics and alarms for scheduled jobs, API latency and AI request failures.' },
]

export const pricing = [
  {
    id: 'Starter',
    audience: 'For independent and online coaches',
    features: ['One coach seat', 'Guided intake and readiness screening', 'Personalised 90-day plans from your templates', 'Automated check-ins and habit tracking', 'Review queue and risk flags'],
  },
  {
    id: 'Growth',
    audience: 'For gyms, studios and coaching teams',
    features: ['Everything in Starter', 'Multiple coaches in one workspace', 'Member routing between coaches', 'Program library shared across the team', 'Cohort and challenge programs'],
    featured: true,
  },
  {
    id: 'Enterprise',
    audience: 'For corporate wellness and multi-site operators',
    features: ['Everything in Growth', 'Multiple locations or client organisations', 'Aggregate engagement reporting for sponsors', 'Assisted program and template setup', 'Security and data-handling review'],
  },
]

export const earlyAccess = {
  status: [
    { label: 'Founded', value: '2026' },
    { label: 'Stage', value: 'Building' },
    { label: 'Access', value: 'Early access' },
  ],
  offer: [
    'A guided setup of your first program template and check-in schedule',
    'Direct access to the founder for feedback and feature requests',
    'Pricing agreed in writing before you onboard any members',
  ],
}
