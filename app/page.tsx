import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import BeforeAfter from '@/components/BeforeAfter'
import LeadForm from '@/components/LeadForm'
import type { Stat } from '@/components/SocialProof'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Custom Software and Fractional CTO Services',
  description:
    'Garrell Tech Solutions turns business requirements into working software, with technical leadership when you need it and no full-time CTO hire.',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Garrell Tech Solutions LLC',
  url: 'https://garrellts.com',
  logo: 'https://garrellts.com/static/images/gts-logo-full-color.png',
  foundingDate: '2024-11',
  description:
    'Custom software development, cloud engineering, and fractional CTO services for businesses, federal primes, and agencies.',
  email: siteMetadata.email,
  telephone: siteMetadata.phoneE164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coral Springs',
    addressRegion: 'FL',
    postalCode: '33065',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Jeremy Garrell',
  },
  sameAs: ['https://www.linkedin.com/company/107989162/'],
}

const HOME_STATS: Stat[] = [
  { value: '150', suffix: '+', label: 'Business customers on Callpurity' },
  { value: '1M', suffix: '+', label: 'Phone numbers managed across 50 states' },
  { value: '7', label: 'Person team led as fractional CTO' },
  { value: '10', suffix: '+', label: 'Years of federal software delivery' },
]

const HERO_PROOF = ['FBI', 'U.S. Army', 'U.S. Marine Corps', '150+ businesses on Callpurity']

const DELIVERED_FOR = [
  'FBI',
  'U.S. Department of Justice',
  'U.S. Army',
  'U.S. Marine Corps',
  'Callpurity',
  'Pro Health Partners',
]

const CONSULT_URL = 'https://calendly.com/jeremy-garrell/30min'

// Author avatar with the background removed. A higher-resolution cut-out would sharpen the card.
const HEADSHOT = { src: '/static/images/jeremy-cutout.png', width: 255, height: 201 }

const EYEBROW = 'text-sm font-semibold tracking-[0.2em] uppercase'

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-6 text-center sm:pt-10">
      <h1
        id="hero-heading"
        className="mx-auto max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-balance text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100"
      >
        Your business requirements, shipped as working software.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-gray-600 sm:text-xl dark:text-gray-400">
        I scope it, build it, and lead the technical side. No full-time CTO required.
      </p>
      <a
        href={CONSULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gold text-primary-900 hover:bg-gold/90 mt-8 block rounded-md px-7 py-5 text-lg font-bold transition-colors duration-200 sm:inline-block"
      >
        Book a 30-min scoping call
      </a>
      <div className="mt-6 flex flex-col items-center gap-1.5 text-[15px] text-gray-700 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 dark:text-gray-300">
        <span className={`${EYEBROW} text-xs text-gray-600 dark:text-gray-400`}>Delivered for</span>
        <span className="font-semibold">
          {HERO_PROOF.map((name, i) => (
            <span key={name}>
              {i > 0 && (
                <span aria-hidden="true" className="mx-2 text-gray-400">
                  ·
                </span>
              )}
              {name}
            </span>
          ))}
        </span>
      </div>
      <BeforeAfter />
    </section>
  )
}

function ProofBand() {
  return (
    <section
      aria-label="Track record"
      className="bg-primary-900 -mx-4 mt-8 px-4 py-10 sm:mx-0 sm:rounded-b-lg sm:px-10 sm:py-14 md:mt-0"
    >
      <dl className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 xl:grid-cols-4">
        {HOME_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-1.5 border-l border-white/20 pl-4 sm:pl-6"
          >
            <dt className="text-primary-200 text-sm leading-snug sm:text-base">{stat.label}</dt>
            <dd className="text-4xl leading-none font-bold text-white sm:text-5xl">
              {stat.value}
              {stat.suffix && <span className="text-gold">{stat.suffix}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col gap-2.5 border-t border-white/20 pt-6 md:flex-row md:items-center md:gap-6">
        <p className={`${EYEBROW} text-primary-300 text-xs whitespace-nowrap`}>Delivered for</p>
        <p className="font-medium text-white sm:text-lg">{DELIVERED_FOR.join('  ·  ')}</p>
      </div>
    </section>
  )
}

function StartProject() {
  return (
    <section
      id="start"
      aria-labelledby="start-heading"
      className="grid scroll-mt-8 grid-cols-1 gap-10 py-16 sm:py-24 xl:grid-cols-12 xl:gap-8"
    >
      <div className="flex flex-col gap-6 xl:col-span-5">
        <div>
          <p className={`${EYEBROW} text-primary-800 dark:text-primary-300`}>Start a project</p>
          <div className="bg-gold mt-3 h-px w-12" />
        </div>
        <h2
          id="start-heading"
          className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100"
        >
          Tell me what you need built.
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          I read every message myself and reply with next steps, or a straight answer if I&rsquo;m
          not the right fit.
        </p>
        <div className="bg-mint border-t-gold flex items-center gap-5 rounded-lg border-t-4 p-5 dark:bg-gray-900">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white sm:h-24 sm:w-24 dark:bg-gray-800">
            <Image
              src={HEADSHOT.src}
              alt="Jeremy Garrell"
              width={HEADSHOT.width}
              height={HEADSHOT.height}
              className="h-full w-full object-cover object-top pt-1.5"
            />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Jeremy Garrell</p>
            <p className="mt-1 text-[15px] leading-snug text-gray-700 dark:text-gray-300">
              Founder and principal engineer. You&rsquo;ll talk with me directly.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className={`${EYEBROW} text-xs text-gray-600 dark:text-gray-400`}>Rather talk now?</p>
          <a
            href={`tel:${siteMetadata.phoneE164}`}
            className="text-2xl font-bold text-gray-900 hover:underline dark:text-gray-100"
          >
            {siteMetadata.phone}
          </a>
          <a
            href={`mailto:${siteMetadata.email}`}
            className="text-primary-800 dark:text-primary-300 text-lg font-semibold underline"
          >
            {siteMetadata.email}
          </a>
        </div>
      </div>
      <div className="xl:col-span-6 xl:col-start-7">
        <LeadForm consultUrl={CONSULT_URL} />
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="xl:mx-[-4rem] xl:w-[calc(100%+8rem)]">
        <Hero />
        <ProofBand />
        <StartProject />
      </div>
    </>
  )
}
