export const EDUCATION = {
  degree: 'Integrated M.Sc. Mathematics + B.E. Mechanical Engineering',
  school: 'BITS Pilani, Pilani Campus',
  years: '2022 — 2027',
  minor: 'Minor in Finance',
}

export const CV_URL = 'https://drive.google.com/file/d/1cGIlzIXyiASmmW71dwmFo2BLGL70CEoR/view?usp=sharing'

export interface Experience {
  role: string
  org: string
  dates: string
  detail: string
  report?: string
  highlight?: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Summer Research Fellow',
    org: 'IIT Madras × Intel',
    dates: 'May 2026 — Present',
    detail:
      'Non-conventional blower design for electronics cooling — CFD simulation of unconventional geometries, aeroacoustic analysis of noise signatures, and thermal performance mapping across 15–65 W loads. The kind of problem where every decibel and every degree is fought for.',
    highlight: true,
  },
  {
    role: 'Robotics Simulation Intern',
    org: 'Ganpat University',
    dates: 'Jan — Mar 2026',
    detail:
      'Built a bipedal robot simulation in PyBullet with ZMP-based stability control — it recovers from a 45° push in 0.65 seconds, which is better than most people on a Monday.',
    report: 'https://drive.google.com/file/d/1O118hIJlvFR2Lxr6OnFH0hb9YdOuVC7U/view?usp=share_link',
  },
  {
    role: 'Research Intern',
    org: 'Lurnable Ltd (UK)',
    dates: 'Aug — Sep 2025',
    detail: 'UX research on user journeys and Gen Z digital behaviour — the psychology interest, weaponised professionally.',
  },
  {
    role: 'Investment Banking Analyst',
    org: 'Finlatics',
    dates: 'Jul — Sep 2025',
    detail: 'Startup profiling, term sheets, and PE exit modeling. The finance minor, field-tested.',
  },
  {
    role: 'Summer Intern — Dynamic Analysis',
    org: 'IGCAR Kalpakkam',
    dates: 'May — Jul 2024',
    detail:
      'Kinematics and control of the Tube Locator Module inside a fast-breeder reactor: PID/MPC controllers and trajectory optimization where precision is not optional.',
    report: 'https://drive.google.com/file/d/19mHRo6RWjJfOYC6ClzsTfhOHhFD6abBb/view?usp=share_link',
  },
]

export type ProjectTag = 'CFD' | 'Thermal' | 'AI/ML' | 'Robotics' | 'Finance' | 'Manufacturing'

export interface Project {
  title: string
  tag: ProjectTag
  blurb: string
  metric?: string
  github?: string
  paper?: string
}

export const PROJECTS: Project[] = [
  {
    title: '2D Compressible Navier–Stokes Solver',
    tag: 'CFD',
    blurb:
      'A structured finite-volume solver written from scratch — Rusanov flux, oblique shock–shock interactions at Mach 2.5, and local adaptive mesh refinement that doubles resolution exactly where the physics gets violent. Validated against oblique-shock theory to within 1%.',
    metric: '1% error vs. theory · 2× AMR',
    github: 'https://github.com/Thilak-Srinivasan/rarefied-gas-solver',
    paper: 'https://drive.google.com/file/d/1t-Bns36dUEZAFchkUJ10hqNMTyt7YoeL/view?usp=sharing',
  },
  {
    title: 'Three-Phase Flow Simulation (VOF + AMR)',
    tag: 'CFD',
    blurb:
      'Gas plume rise through stratified liquid layers, resolved with volume-of-fluid interface capture and adaptive refinement in ANSYS Fluent and Basilisk C. Capillary pressure, bubble breakup, the whole mess — captured in high resolution.',
    metric: 'high-res interface capture',
    github: 'https://github.com/Thilak-Srinivasan/three-phase-flow-vof',
    paper: 'https://drive.google.com/file/d/1_wUjSBpUOoNHj1we_0eCFgjjvNyIYlg_/view?usp=share_link',
  },
  {
    title: 'Livestock Shelter Thermal Design',
    tag: 'Thermal',
    blurb:
      'A three-layer phase-change-material roof for arid-climate shelters, with a full life-cycle assessment and cost analysis. Keeps the indoors at or below 20 °C and cuts energy use by 12–18% — engineering that a heat-stressed animal can feel.',
    metric: '12–18% energy saved · ≤20 °C',
    github: 'https://github.com/Thilak-Srinivasan/livestock-shelter-lca-lcca',
    paper: 'https://drive.google.com/file/d/10WwBMT8hFxlqQCel3R3-1LdKKCngETOs/view?usp=share_link',
  },
  {
    title: 'Smart Capsule Endoscopy — Multiphysics',
    tag: 'Thermal',
    blurb:
      'An actively propelled diagnostic capsule, modelled as a coupled electromagnetic–fluidic–structural system: 78.4 mN of propulsion through the GI tract, with an onboard AI classifier hitting 96.2% diagnostic sensitivity.',
    metric: '78.4 mN · 96.2% AI sensitivity',
    github: 'https://github.com/Thilak-Srinivasan/capsule-endoscopy',
    paper: 'https://drive.google.com/file/d/1CGlDWO5dj9MQmJVf3oCfF4uJglBwfSU2/view?usp=share_link',
  },
  {
    title: 'EV Battery Thermal Management',
    tag: 'Thermal',
    blurb:
      'Cooling architecture study for a Tesla Model Y pack — all 4,416 cells of it — holding the cell-to-cell temperature spread under 5 °C, because batteries age like people: unevenly, unless cared for.',
    metric: 'ΔT < 5 °C across 4,416 cells',
    paper: 'https://drive.google.com/file/d/1QFciVvFiOVoIyAMufLaMnusDpQvN6JOp/view?usp=share_link',
  },
  {
    title: 'AI Predictive Maintenance — Defence Platforms',
    tag: 'AI/ML',
    blurb:
      'Random Forest models forecasting spare-part demand and supply disruptions for S-400, Rafale and Apache platforms. Co-authored and presented at the LEAD 2025 SCM conference.',
    metric: 'presented at LEAD 2025',
    github: 'https://github.com/Thilak-Srinivasan/ai-defence-supply-chain',
    paper: 'https://drive.google.com/file/d/1j7YZm5hlzfUjfz9y66tNYGLNLfCXM-jz/view?usp=share_link',
  },
  {
    title: 'TCS Financial Time Series',
    tag: 'Finance',
    blurb:
      'ARIMA/SARIMA modelling of TCS returns with Student-t innovations, because markets have fat tails and pretending otherwise is how you lose money. Estimated ν̂ = 3.606.',
    metric: 'ν̂ = 3.606',
    github: 'https://github.com/Thilak-Srinivasan/tcs-financial-time-series',
    paper: 'https://drive.google.com/file/d/1ml-DV5bJA8EZulhCa91VB0FBTXETR5tu/view?usp=share_link',
  },
  {
    title: 'Non-Linear Regression Models',
    tag: 'AI/ML',
    blurb:
      'Gauss–Newton and Levenberg–Marquardt fitting engines built and benchmarked by hand — an 8% reduction in sum-of-squared error over baseline fits.',
    metric: '8% SSE reduction',
    paper: 'https://drive.google.com/file/d/1kS48Mvd9p7PkDUnQY3uQnPSy5ckn_yJJ/view?usp=share_link',
  },
  {
    title: 'V6 Piston Assembly',
    tag: 'Manufacturing',
    blurb:
      'A full piston assembly for a V6 engine, machined in aluminium alloy — CNC where it mattered, manual where it taught more. Proof that simulation people can still make chips fly.',
    metric: 'chips were made',
    github: 'https://github.com/Thilak-Srinivasan/piston-assembly-v6',
  },
]

/** Big-number stat band, Wrapped-style. */
export interface Stat {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

export const STATS: Stat[] = [
  { value: 2.5, decimals: 1, prefix: 'MACH ', label: 'oblique shocks resolved, from a solver written from scratch' },
  { value: 4416, label: 'battery cells held within a 5 °C spread' },
  { value: 96.2, decimals: 1, suffix: '%', label: 'diagnostic AI sensitivity, capsule endoscopy' },
  { value: 9, label: 'projects on the grid, from shock waves to term sheets' },
]

export const SKILLS = [
  'Python', 'C/C++', 'MATLAB', 'Simulink', 'Basilisk C',
  'ANSYS Fluent', 'COMSOL', 'ParaView', 'Fusion 360',
  'FVM', 'VOF', 'AMR', 'PID/MPC', 'ZMP/LIPM',
  'PyBullet', 'MuJoCo', 'PDEs', 'Optimization', 'Numerical Analysis',
]

export const PUBLICATION = {
  title: 'AI-Based Preventive Maintenance of Equipment & Demand Forecast of Spares',
  venue: 'presented at LEAD 2025 SCM Conference',
  link: 'https://drive.google.com/file/d/1CergY0qVHsykl8NoB2rdYo2Re0HplyNN/view?usp=share_link',
}

export interface Cert {
  label: string
  link?: string
}

export const CERTS: Cert[] = [
  {
    label: 'Certificate of Distinction — CeNSE Winter School, IISc (Dec 2025)',
    link: 'https://drive.google.com/file/d/1TrVd9blF_JB20ORt_HBQqHuPFjouxol5/view?usp=share_link',
  },
  {
    label: 'COMSOL Battery Modeling Certification (Nov 2025)',
    link: 'https://drive.google.com/file/d/1ssPiOSUgE5o7uj5LJFExhQCA3ENRT8Ao/view?usp=share_link',
  },
  {
    label: 'Innovate with ANSYS Simulation Tools — Coursera (Oct 2025)',
    link: 'https://coursera.org/verify/GSNOI2RWYSPZ',
  },
  {
    label: 'AI Infused Software Engineering Workshop (Jan 2026)',
    link: 'https://drive.google.com/file/d/1Yb7ChVeLXXTSp6FHaBmZoQjhYgD_fmWy/view?usp=share_link',
  },
  {
    label: 'Certificate of Appreciation — IGCAR (Jul 2024)',
    link: 'https://drive.google.com/file/d/13NTk7KnLQ0ffQDocjgme3lGDJt8ljuBC/view?usp=share_link',
  },
]
