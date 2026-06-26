import type  { User ,Task} from '../Types/types'
export const users: User[] = [
  { id: 'u1', name: 'Sabbir Hossain', email: 'admin@taskflow.com', password: 'admin123',
    role: 'admin', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'u2', name: 'Arif Rahman',    email: 'arif@taskflow.com',   password: 'pass123',
    role: 'member', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'u3', name: 'Nadia Islam',    email: 'nadia@taskflow.com',  password: 'pass123',
    role: 'member', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'u4', name: 'Karim Uddin',    email: 'karim@taskflow.com',  password: 'pass123',
    role: 'member', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 'u5', name: 'Farhana Begum',  email: 'farhana@taskflow.com',password: 'pass123',
    role: 'member', avatar: 'https://i.pravatar.cc/150?img=9' },
];

export const projects = [
  { id: 'p1', name: 'HyipUp Platform',     color: '#4F46E5',
    description: 'HYIP investment platform for CodeCanyon.',
    memberIds: ['u1','u2','u3'], createdAt: '2026-06-01' },

  { id: 'p2', name: 'GOB Esports Portal',  color: '#16A34A',
    description: 'Esports tournament management platform.',
    memberIds: ['u1','u3','u4'], createdAt: '2026-06-03' },

  { id: 'p3', name: 'Food Delivery App',   color: '#D97706',
    description: 'Mobile-first food ordering experience.',
    memberIds: ['u1','u2','u4','u5'], createdAt: '2026-06-05' },

  { id: 'p4', name: 'Prediction Market',   color: '#DC2626',
    description: 'Polymarket-style prediction market SaaS.',
    memberIds: ['u1','u5'], createdAt: '2026-06-08' },
];

export type Status   = 'todo' | 'inprogress' | 'blocked' | 'completed';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export const tasks: Task[] = [
  // ── HyipUp Platform ────────────────────────────────────────────
  { id: 't1',  projectId: 'p1', title: 'Optimize Landing Page',
    description: 'Improve CLS and LCP scores for the hero section.',
    status: 'todo', priority: 'high', assigneeId: 'u2',
    dueDate: '2026-06-25', tags: ['Frontend','SEO'],
    subtasks: [
      { id: 'st1', title: 'Audit Lighthouse score', done: true },
      { id: 'st2', title: 'Compress hero images',   done: false },
      { id: 'st3', title: 'Lazy load below fold',   done: false },
    ] },

  { id: 't2',  projectId: 'p1', title: 'Admin Panel Auth Flow',
    description: 'JWT login + refresh token implementation.',
    status: 'inprogress', priority: 'critical', assigneeId: 'u3',
    dueDate: '2026-06-20', tags: ['Backend','Security'],
    subtasks: [
      { id: 'st4', title: 'Design token schema',  done: true },
      { id: 'st5', title: 'Implement middleware',  done: true },
      { id: 'st6', title: 'Write unit tests',      done: false },
    ] },

  { id: 't3',  projectId: 'p1', title: 'Payment Gateway Integration',
    description: 'Stripe webhook and payout flow.',
    status: 'blocked', priority: 'critical', assigneeId: 'u2',
    dueDate: '2026-06-22', tags: ['Backend','Payments'],
    subtasks: [
      { id: 'st7', title: 'Set up Stripe keys',   done: true },
      { id: 'st8', title: 'Webhook listener',     done: false },
    ] },

  { id: 't4',  projectId: 'p1', title: 'Write CodeCanyon Documentation',
    description: 'Full installation and feature documentation.',
    status: 'completed', priority: 'medium', assigneeId: 'u1',
    dueDate: '2026-06-18', tags: ['Docs'],
    subtasks: [
      { id: 'st9',  title: 'Installation guide', done: true },
      { id: 'st10', title: 'API reference',      done: true },
    ] },

  // ── GOB Esports ────────────────────────────────────────────────
  { id: 't5',  projectId: 'p2', title: 'Tournament Bracket UI',
    description: 'Single/double elimination bracket renderer.',
    status: 'todo', priority: 'high', assigneeId: 'u3',
    dueDate: '2026-07-01', tags: ['Frontend','UI'],
    subtasks: [
      { id: 'st11', title: 'Design bracket SVG', done: false },
      { id: 'st12', title: 'Wire up match data', done: false },
    ] },

  { id: 't6',  projectId: 'p2', title: 'Player Profile Page',
    description: 'Stats, match history and social links.',
    status: 'inprogress', priority: 'medium', assigneeId: 'u4',
    dueDate: '2026-06-28', tags: ['Frontend'],
    subtasks: [
      { id: 'st13', title: 'Profile hero section', done: true },
      { id: 'st14', title: 'Stats grid',           done: false },
    ] },

  { id: 't7',  projectId: 'p2', title: 'Admin CRUD for Teams',
    description: 'Create, edit, and remove teams from admin panel.',
    status: 'completed', priority: 'high', assigneeId: 'u1',
    dueDate: '2026-06-15', tags: ['Admin','Backend'],
    subtasks: [
      { id: 'st15', title: 'Team list table',   done: true },
      { id: 'st16', title: 'Create team modal', done: true },
      { id: 'st17', title: 'Delete with toast', done: true },
    ] },

  // ── Food Delivery App ───────────────────────────────────────────
  { id: 't8',  projectId: 'p3', title: 'Menu Browsing Screen',
    description: 'Category tabs, item cards, and cart icon.',
    status: 'todo', priority: 'high', assigneeId: 'u4',
    dueDate: '2026-07-05', tags: ['Mobile','UI'],
    subtasks: [
      { id: 'st18', title: 'Category tab bar',  done: false },
      { id: 'st19', title: 'Item card component', done: false },
    ] },

  { id: 't9',  projectId: 'p3', title: 'Checkout & Order Summary',
    description: 'Cart review, promo code, and place order flow.',
    status: 'inprogress', priority: 'critical', assigneeId: 'u2',
    dueDate: '2026-07-03', tags: ['Mobile','Payments'],
    subtasks: [
      { id: 'st20', title: 'Cart list view',    done: true },
      { id: 'st21', title: 'Promo code input',  done: false },
      { id: 'st22', title: 'Order confirmation', done: false },
    ] },

  { id: 't10', projectId: 'p3', title: 'Push Notification Setup',
    description: 'Firebase Cloud Messaging for order status updates.',
    status: 'blocked', priority: 'medium', assigneeId: 'u5',
    dueDate: '2026-07-10', tags: ['Backend','Notifications'],
    subtasks: [
      { id: 'st23', title: 'FCM credentials', done: false },
    ] },

  { id: 't11', projectId: 'p3', title: 'Driver Location Tracking',
    description: 'Real-time map with driver pin using Leaflet.',
    status: 'todo', priority: 'high', assigneeId: 'u3',
    dueDate: '2026-07-08', tags: ['Maps','Frontend'],
    subtasks: [] },
    { id: 't12', projectId: 'p4', title: 'Market Creation Flow',
    description: 'Admin wizard to create a binary prediction market.',
    status: 'todo', priority: 'high', assigneeId: 'u1',
    dueDate: '2026-07-15', tags: ['Frontend','Admin'],
    subtasks: [
      { id: 'st24', title: 'Step 1 — Market details form', done: false },
      { id: 'st25', title: 'Step 2 — Resolution criteria',  done: false },
    ] },

  { id: 't13', projectId: 'p4', title: 'Probability Chart Widget',
    description: 'Live ApexCharts area chart showing Yes/No probability.',
    status: 'inprogress', priority: 'medium', assigneeId: 'u5',
    dueDate: '2026-07-12', tags: ['Charts','Frontend'],
    subtasks: [
      { id: 'st26', title: 'Static chart render', done: true },
      { id: 'st27', title: 'Wire live data',      done: false },
    ] },

  { id: 't14', projectId: 'p4', title: 'Branding & Naming',
    description: 'Finalise product name, logo concept, and colour palette.',
    status: 'completed', priority: 'low', assigneeId: 'u1',
    dueDate: '2026-06-10', tags: ['Design','Brand'],
    subtasks: [
      { id: 'st28', title: 'Name shortlist',    done: true },
      { id: 'st29', title: 'Colour palette',    done: true },
    ] },
];
export const weeklyActivity = [
  { day: 'Mon', tasksCreated: 3, tasksCompleted: 1 },
  { day: 'Tue', tasksCreated: 5, tasksCompleted: 4 },
  { day: 'Wed', tasksCreated: 2, tasksCompleted: 2 },
  { day: 'Thu', tasksCreated: 7, tasksCompleted: 3 },
  { day: 'Fri', tasksCreated: 4, tasksCompleted: 5 },
  { day: 'Sat', tasksCreated: 1, tasksCompleted: 1 },
  { day: 'Sun', tasksCreated: 0, tasksCompleted: 0 },
]

