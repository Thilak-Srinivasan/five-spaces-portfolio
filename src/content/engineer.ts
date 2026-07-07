export const EDUCATION = {
  degree: 'Integrated M.Sc. Mathematics + B.E. Mechanical Engineering',
  school: 'BITS Pilani, Pilani Campus',
  years: '2022 — 2027',
  minor: 'Minor in Finance',
}

export interface Experience {
  role: string
  org: string
  dates: string
  detail: string
  highlight?: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Summer Research Fellow',
    org: 'IIT Madras × Intel',
    dates: 'May 2026 — Present',
    detail:
      'Non-conventional blower design for electronics cooling — CFD simulation, aeroacoustic analysis, and thermal performance across 15–65 W loads.',
    highlight: true,
  },
  {
    role: 'Robotics Simulation Intern',
    org: 'Ganpat University',
    dates: 'Jan — Mar 2026',
    detail: 'Bipedal robot in PyBullet; ZMP stability control; 45° push recovery in 0.65 s.',
  },
  {
    role: 'Research Intern',
    org: 'Lurnable Ltd (UK)',
    dates: 'Aug — Sep 2025',
    detail: 'UX research: user journeys and Gen Z behavioral insights.',
  },
  {
    role: 'Investment Banking Analyst',
    org: 'Finlatics',
    dates: 'Jul — Sep 2025',
    detail: 'Startup profiling, term sheets, PE exit modeling.',
  },
  {
    role: 'Summer Intern — Dynamic Analysis',
    org: 'IGCAR Kalpakkam',
    dates: 'May — Jul 2024',
    detail: 'Tube Locator Module kinematics; PID/MPC control; trajectory optimization.',
  },
]

export type ProjectTag = 'CFD' | 'Thermal' | 'AI/ML' | 'Robotics' | 'Finance' | 'Manufacturing'

export interface Project {
  title: string
  tag: ProjectTag
  blurb: string
  metric?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Three-Phase Flow Simulation (VOF + AMR)',
    tag: 'CFD',
    blurb: 'Gas plume rise through stratified layers — capillary pressure and bubble dynamics in ANSYS Fluent & Basilisk C.',
    metric: 'high-res interface capture',
  },
  {
    title: '2D Compressible Navier–Stokes Solver',
    tag: 'CFD',
    blurb: 'Structured FVM solver written from scratch; Rusanov flux; oblique shock interactions at Mach 2.5 with local AMR.',
    metric: '1% error vs. theory · 2× AMR resolution',
  },
  {
    title: 'Livestock Shelter Thermal Design',
    tag: 'Thermal',
    blurb: 'Three-layer PCM roof for arid climates, with full LCA/LCCA.',
    metric: '12–18% energy savings · ≤20 °C indoors',
  },
  {
    title: 'Smart Capsule Endoscopy — Multiphysics',
    tag: 'Thermal',
    blurb: 'EM–fluidic–structural coupling for an actively propelled capsule with onboard diagnostic AI.',
    metric: '78.4 mN propulsion · 96.2% AI sensitivity',
  },
  {
    title: 'EV Battery Thermal Management',
    tag: 'Thermal',
    blurb: 'Tesla Model Y pack cooling study across 4,416 cells.',
    metric: 'ΔT < 5 °C across pack',
  },
  {
    title: 'AI Predictive Maintenance — Defence Platforms',
    tag: 'AI/ML',
    blurb: 'Random Forest disruption forecasting for S-400, Rafale and Apache supply chains. Presented at LEAD 2025 SCM.',
    metric: 'published + presented',
  },
  {
    title: 'TCS Financial Time Series',
    tag: 'Finance',
    blurb: 'ARIMA/SARIMA with Student-t innovations for fat-tailed returns.',
    metric: 'ν̂ = 3.606',
  },
  {
    title: 'Non-Linear Regression Models',
    tag: 'AI/ML',
    blurb: 'Gauss–Newton and Levenberg–Marquardt fitting engines.',
    metric: '8% SSE reduction',
  },
  {
    title: 'V6 Piston Assembly',
    tag: 'Manufacturing',
    blurb: 'CNC and manual machining of an aluminium-alloy piston assembly.',
    metric: 'chips were made',
  },
]

export const SKILLS = [
  'Python', 'C/C++', 'MATLAB', 'Simulink', 'Basilisk C',
  'ANSYS Fluent', 'COMSOL', 'ParaView', 'Fusion 360',
  'FVM', 'VOF', 'AMR', 'PID/MPC', 'ZMP/LIPM',
  'PyBullet', 'MuJoCo', 'PDEs', 'Optimization', 'Numerical Analysis',
]

export const PUBLICATION = {
  title: 'AI-Based Preventive Maintenance of Equipment & Demand Forecast of Spares',
  venue: 'LEAD 2025 SCM Conference',
}

export const CERTS = [
  'Certificate of Distinction — CeNSE Winter School, IISc (Dec 2025)',
  'COMSOL Battery Modeling Certification (Nov 2025)',
  'Innovate with ANSYS Simulation Tools — Coursera (Oct 2025)',
  'Certificate of Appreciation — IGCAR (Jul 2024)',
]
