// Fictional sample data for the interactive coach console on the homepage.
// Every name, number and event below is invented for demonstration only and
// is labelled "Sample data" wherever it is shown. None of it describes real
// JiXora customers, members or company performance.

export const workspace = {
  name: 'Northside Strength Co.',
  plan: 'Growth',
  coaches: ['Coach Mia', 'Coach Femi', 'Coach Lars'],
  sampleDate: 'Mon 12 Oct',
}

export const programs = [
  { id: 'fat-loss', name: 'Fat Loss Foundations', members: 5, weeks: 13, focus: 'Body composition' },
  { id: 'strength', name: 'Strength Base', members: 4, weeks: 13, focus: 'Strength' },
  { id: 'return', name: 'Return to Training', members: 3, weeks: 13, focus: 'Consistency' },
  { id: 'move90', name: 'Move90 (Corporate)', members: 4, weeks: 13, focus: 'General fitness' },
]

const programName = Object.fromEntries(programs.map((p) => [p.id, p.name]))

const raw = [
  { id: 'm01', name: 'Daniel Okafor', program: 'strength', coach: 'Coach Femi', day: 38, adherence: 82, lastCheckIn: '2h ago', status: 'On track', location: 'Gym', goal: 'Get stronger', sessions: [1, 1, 0, 1], reply: 'Travelling Thu–Fri, no gym access.' },
  { id: 'm02', name: 'Amara Nwosu', program: 'fat-loss', coach: 'Coach Mia', day: 41, adherence: 64, lastCheckIn: 'Yesterday', status: 'Slipping', location: 'Both', goal: 'Lose body fat', sessions: [1, 0, 1, 0], reply: 'Left knee sore after lunges again.' },
  { id: 'm03', name: 'Tomás Herrera', program: 'return', coach: 'Coach Lars', day: 22, adherence: 38, lastCheckIn: '5 days ago', status: 'At risk', location: 'Home', goal: 'Build consistency', sessions: [0, 0, 1, 0], reply: 'No reply to the last 4 check-ins.' },
  { id: 'm04', name: 'Grace Lin', program: 'strength', coach: 'Coach Femi', day: 44, adherence: 96, lastCheckIn: '1h ago', status: 'On track', location: 'Gym', goal: 'Build muscle', sessions: [1, 1, 1, 1], reply: 'Squat felt easy at RPE 7.' },
  { id: 'm05', name: 'Priya Raman', program: 'move90', coach: 'Coach Mia', day: 17, adherence: 71, lastCheckIn: 'Today', status: 'Slipping', location: 'Home', goal: 'Improve fitness', sessions: [1, 0, 1, 1], reply: 'Evenings keep getting taken by work calls.' },
  { id: 'm06', name: 'Kwame Mensah', program: 'fat-loss', coach: 'Coach Mia', day: 63, adherence: 88, lastCheckIn: '3h ago', status: 'On track', location: 'Gym', goal: 'Lose body fat', sessions: [1, 1, 1, 0], reply: 'Down 1 notch on the belt this week.' },
  { id: 'm07', name: 'Sofia Rossi', program: 'move90', coach: 'Coach Lars', day: 17, adherence: 90, lastCheckIn: 'Today', status: 'On track', location: 'Both', goal: 'Improve fitness', sessions: [1, 1, 1, 1], reply: 'Completed the 20-minute version on Wednesday.' },
  { id: 'm08', name: 'Ifeoma Adeyemi', program: 'return', coach: 'Coach Lars', day: 29, adherence: 57, lastCheckIn: '3 days ago', status: 'Slipping', location: 'Home', goal: 'Build consistency', sessions: [1, 0, 0, 1], reply: 'Missed two sessions — kids were ill.' },
  { id: 'm09', name: 'Marcus Webb', program: 'strength', coach: 'Coach Femi', day: 12, adherence: 79, lastCheckIn: 'Yesterday', status: 'On track', location: 'Gym', goal: 'Get stronger', sessions: [1, 1, 0, 1], reply: 'Still learning the hinge pattern.' },
  { id: 'm10', name: 'Hana Sato', program: 'fat-loss', coach: 'Coach Mia', day: 55, adherence: 45, lastCheckIn: '6 days ago', status: 'At risk', location: 'Gym', goal: 'Lose body fat', sessions: [0, 1, 0, 0], reply: 'Last reply: “Busy week, will catch up.”' },
  { id: 'm11', name: 'Oliver Brennan', program: 'move90', coach: 'Coach Lars', day: 17, adherence: 0, lastCheckIn: '9 days ago', status: 'Paused', location: 'Home', goal: 'Improve fitness', sessions: [0, 0, 0, 0], reply: 'Paused by coach: on annual leave until 19 Oct.' },
  { id: 'm12', name: 'Zainab Bello', program: 'fat-loss', coach: 'Coach Mia', day: 8, adherence: 100, lastCheckIn: '30m ago', status: 'On track', location: 'Home', goal: 'Lose body fat', sessions: [1, 1, 1, 1], reply: 'Readiness questionnaire complete, week 2 started.' },
  { id: 'm13', name: 'Lucas Moreau', program: 'return', coach: 'Coach Lars', day: 71, adherence: 84, lastCheckIn: '4h ago', status: 'On track', location: 'Both', goal: 'Build consistency', sessions: [1, 1, 0, 1], reply: 'Ready for the week 11 milestone review.' },
  { id: 'm14', name: 'Chloe Adams', program: 'move90', coach: 'Coach Mia', day: 17, adherence: 52, lastCheckIn: '4 days ago', status: 'Slipping', location: 'Gym', goal: 'Improve fitness', sessions: [0, 1, 0, 1], reply: 'Gym too busy at lunchtime.' },
  { id: 'm15', name: 'Ethan Clarke', program: 'strength', coach: 'Coach Femi', day: 86, adherence: 91, lastCheckIn: '2h ago', status: 'On track', location: 'Gym', goal: 'Build muscle', sessions: [1, 1, 1, 1], reply: 'Final week — booked the day-90 assessment.' },
  { id: 'm16', name: 'Ngozi Eze', program: 'fat-loss', coach: 'Coach Mia', day: 33, adherence: 74, lastCheckIn: 'Yesterday', status: 'On track', location: 'Both', goal: 'Lose body fat', sessions: [1, 1, 0, 0], reply: 'Swapped Friday for a walk + core session.' },
]

export const members = raw.map((m) => ({
  ...m,
  programName: programName[m.program],
  week: Math.min(13, Math.ceil(m.day / 7)),
}))

export const STATUSES = ['On track', 'Slipping', 'At risk', 'Paused']

// AI-drafted plan changes waiting for a coach decision.
export const reviewQueue = [
  {
    id: 'r1',
    memberId: 'm01',
    type: 'Session swap',
    title: 'Replace Thursday’s gym session with a 30-minute bodyweight session',
    reason: 'Daniel replied to this morning’s check-in that he has no gym access Thursday–Friday.',
    detail: ['Thu: Lower Body A (gym, 55 min) → Bodyweight Lower (hotel room, 30 min)', 'Fri: unchanged rest day', 'Weekly volume stays within 10% of plan'],
    confidence: 'High',
  },
  {
    id: 'r2',
    memberId: 'm02',
    type: 'Load adjustment',
    title: 'Remove walking lunges and cap lower-body volume for week 6',
    reason: 'Amara has reported knee soreness after lunges in two check-ins this fortnight.',
    detail: ['Walking lunges → box step-ups (low height)', 'Lower-body sets reduced from 14 to 11', 'Suggest Amara speaks to a physiotherapist or GP if soreness continues'],
    confidence: 'Needs coach judgement',
    safety: true,
  },
  {
    id: 'r3',
    memberId: 'm05',
    type: 'Schedule change',
    title: 'Move Priya’s sessions from 18:30 to 07:00, Mon/Wed/Fri',
    reason: 'Priya has missed 3 of the last 5 evening sessions and cited work calls each time.',
    detail: ['Check-in reminders move to 06:30', 'Session length reduced to 35 min to fit before work'],
    confidence: 'Medium',
  },
  {
    id: 'r4',
    memberId: 'm03',
    type: 'Re-engagement',
    title: 'Send a low-pressure restart message and a 15-minute “week 1 again” option',
    reason: 'Tomás has not replied to 4 check-ins and has completed 1 session in the last 2 weeks.',
    detail: ['Message drafted in Coach Lars’s tone', 'Offers a shorter restart week rather than catching up missed sessions'],
    confidence: 'Medium',
  },
  {
    id: 'r5',
    memberId: 'm04',
    type: 'Progression',
    title: 'Progress Grace to the week 7 strength block one week early',
    reason: '96% adherence and RPE below target on main lifts for 3 consecutive sessions.',
    detail: ['Back squat 3×6 → 4×5 at +5%', 'Adds a second upper-body pull day'],
    confidence: 'High',
  },
]

export const initialActivity = [
  { id: 'a1', time: '08:42', kind: 'checkin', text: 'Grace Lin completed Upper Body B and rated it “just right”.' },
  { id: 'a2', time: '08:15', kind: 'ai', text: 'JiXora drafted a session swap for Daniel Okafor after a travel reply.' },
  { id: 'a3', time: '07:58', kind: 'checkin', text: 'Zainab Bello finished the readiness questionnaire — plan generated.' },
  { id: 'a4', time: '07:30', kind: 'system', text: 'Morning check-ins sent to 15 active members.' },
  { id: 'a5', time: 'Sun 19:10', kind: 'alert', text: 'Hana Sato moved to At risk: 6 days without a reply.' },
  { id: 'a6', time: 'Sun 17:02', kind: 'checkin', text: 'Ethan Clarke booked his day-90 assessment.' },
]

// Weekly adherence (% of planned sessions completed) across the 13-week program.
export const adherenceSeries = {
  all: [92, 88, 84, 78, 76, 77, 79, 80, 81, 80, 82, 83, 84],
  'fat-loss': [94, 90, 85, 77, 73, 74, 77, 79, 80, 79, 81, 82, 83],
  strength: [95, 93, 90, 87, 86, 88, 89, 90, 90, 89, 91, 92, 92],
  return: [86, 80, 74, 66, 64, 67, 70, 72, 74, 75, 76, 78, 79],
  move90: [90, 87, 83, 79, 77, 76, 78, 79, 80, 80, 81, 81, 82],
}

export const responseRate = { current: 78, previous: 71 }

export const programDocument = {
  program: 'Strength Base',
  member: 'Grace Lin',
  week: 7,
  session: 'Lower Body A',
  duration: '55 min',
  location: 'Gym',
  blocks: [
    { name: 'Back squat', sets: '4 × 5', load: '62.5 kg', rpe: 'RPE 7–8', note: '+5% from week 6' },
    { name: 'Romanian deadlift', sets: '3 × 8', load: '55 kg', rpe: 'RPE 7', note: 'Pause 1s at knee' },
    { name: 'Bulgarian split squat', sets: '3 × 8 / leg', load: '2 × 10 kg', rpe: 'RPE 7', note: '' },
    { name: 'Hamstring curl', sets: '3 × 12', load: '27 kg', rpe: 'RPE 8', note: '' },
    { name: 'Dead bug', sets: '3 × 10', load: 'Bodyweight', rpe: '—', note: 'Slow exhale' },
  ],
  coachNote: 'Grace is moving well under load. Keep squat depth consistent before adding more weight in week 8.',
  checkIn: 'Post-session check-in at 19:00: difficulty, energy and any pain or discomfort.',
}
