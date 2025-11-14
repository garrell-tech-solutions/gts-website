interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Callpurity Dashboard',
    description: `Unlock the power of your outbound calling strategy with the Callpurity Dashboard – a robust platform designed to transform raw data into actionable insights.`,
    imgSrc: '/static/images/CP_FullLogo_Standard.png',
    href: 'https://app.callpurity.com',
  },
  {
    title: 'ACA Client Tracker',
    description: `Workflow aid used to audit call center agent paystubs against health insurance client lists`,
    imgSrc: '/static/images/aca-tracker-logo.png',
    href: 'https://aca-tracker.fly.dev/',
  }
]

export default projectsData
