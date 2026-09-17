import type { ReactNode } from 'react'

const PRIMARY = 'text-primary-800 dark:text-primary-300'
const PRIMARY_BORDER = 'border-primary-800/30 dark:border-primary-300/30'

function StatBlock({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-primary-800 dark:text-primary-300 text-3xl font-bold sm:text-4xl">
        {value}
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <div className="text-primary-700 dark:text-primary-300/70 mt-1 text-xs sm:text-sm">
        {label}
      </div>
    </div>
  )
}

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const ShieldIcon = () => (
  <IconBase>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
  </IconBase>
)

const GavelIcon = () => (
  <IconBase>
    <rect x="2.5" y="2.5" width="4.5" height="9" rx="1.2" transform="rotate(45 4.75 7)" />
    <line x1="9" y1="9" x2="16" y2="16" />
    <line x1="4" y1="21" x2="14" y2="21" />
  </IconBase>
)

const StarIcon = () => (
  <IconBase>
    <path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z" />
  </IconBase>
)

const AnchorIcon = () => (
  <IconBase>
    <circle cx="12" cy="4.5" r="1.75" />
    <line x1="12" y1="6.5" x2="12" y2="21" />
    <line x1="8.5" y1="10" x2="15.5" y2="10" />
    <path d="M5 14a7 7 0 0 0 14 0" />
  </IconBase>
)

const PhoneIcon = () => (
  <IconBase>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </IconBase>
)

const HealthIcon = () => (
  <IconBase>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M12 15.3c-2.4-1.4-3.9-2.9-3.9-4.6a2.1 2.1 0 0 1 3.9-1.2 2.1 2.1 0 0 1 3.9 1.2c0 1.7-1.5 3.2-3.9 4.6z" />
  </IconBase>
)

function SupportedBadge({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg border bg-white px-5 py-4 dark:bg-gray-950 ${PRIMARY} ${PRIMARY_BORDER}`}
    >
      {icon}
      <span className="text-base leading-tight font-medium text-gray-700 dark:text-gray-300">
        {name}
      </span>
    </li>
  )
}

const SUPPORTED_ORGS = [
  { key: 'fbi', icon: <ShieldIcon />, name: 'Federal Bureau of Investigation' },
  { key: 'doj', icon: <GavelIcon />, name: 'U.S. Department of Justice' },
  { key: 'army', icon: <StarIcon />, name: 'U.S. Army' },
  { key: 'usmc', icon: <AnchorIcon />, name: 'U.S. Marine Corps' },
  { key: 'callpurity', icon: <PhoneIcon />, name: 'Callpurity' },
  { key: 'php', icon: <HealthIcon />, name: 'Pro Health Partners' },
]

export type Stat = { value: string; suffix?: string; label: string }

const CAPABILITY_STATS: Stat[] = [
  { value: '10', suffix: '+', label: 'Years of federal software delivery' },
  { value: '3', label: 'Federal customers — FBI · Army · USMC' },
  { value: '3', label: 'Legacy systems modernized' },
  { value: '150', suffix: '+', label: 'Businesses served on Callpurity SaaS' },
  { value: '1M', suffix: '+', label: 'Records managed across 50 states' },
]

export function KeyStats({ stats = CAPABILITY_STATS }: { stats?: Stat[] }) {
  // Six stats read as two rows of three; five fit on one row.
  const columns = stats.length === 6 ? 'sm:grid-cols-3 sm:gap-y-8' : 'sm:grid-cols-5'

  return (
    <section
      aria-label="Key figures"
      className="bg-mint -mx-4 px-4 py-6 sm:mx-0 sm:rounded-lg sm:px-10 dark:bg-gray-900"
    >
      <p className="text-primary-700 dark:text-primary-300/70 mb-4 text-center text-sm font-semibold tracking-[0.2em] uppercase sm:text-base">
        Track Record
      </p>
      <div className={`grid grid-cols-2 gap-6 sm:gap-4 ${columns}`}>
        {stats.map((stat) => (
          <StatBlock key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

export function SupportedOrgs() {
  return (
    <section aria-label="Supported agencies and enterprise systems" className="mt-8">
      <div className="-mx-4 bg-gray-50 px-4 py-6 sm:mx-0 sm:rounded-lg sm:px-10 dark:bg-gray-900/50">
        <p className="text-primary-700 dark:text-primary-300/70 mb-5 text-center text-sm font-semibold tracking-[0.2em] uppercase sm:text-base">
          Supported Agencies and Enterprise Systems
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORTED_ORGS.map((org) => (
            <SupportedBadge key={org.key} icon={org.icon} name={org.name} />
          ))}
        </ul>
      </div>
    </section>
  )
}
