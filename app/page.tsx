import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import { KeyStats, SupportedOrgs, type Stat } from '@/components/SocialProof'

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
  email: 'jeremy@garrellts.com',
  telephone: '+1-201-400-7782',
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

// Commercial work on the first row, federal delivery on the second.
const HOME_STATS: Stat[] = [
  { value: '150', suffix: '+', label: 'Business customers on Callpurity' },
  { value: '1M', suffix: '+', label: 'Phone numbers managed across 50 states' },
  { value: '7', label: 'Person team led as fractional CTO' },
  { value: '10', suffix: '+', label: 'Years of federal software delivery' },
  { value: '3', label: 'Federal customers: FBI, Army, USMC' },
  { value: '3', label: 'Federal legacy systems modernized' },
]

const CONSULT_URL = 'https://calendly.com/jeremy-garrell/30min'

// Author avatar with the background removed. Shown small, as a byline next to the CTA.
const HEADSHOT = { src: '/static/images/jeremy-cutout.png', width: 112, height: 88 }

function ConsultByline() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-mint h-14 w-14 shrink-0 overflow-hidden rounded-full dark:bg-gray-800">
        <Image
          src={HEADSHOT.src}
          alt="Jeremy Garrell"
          width={HEADSHOT.width}
          height={HEADSHOT.height}
          priority
          className="h-full w-full object-cover object-top pt-0.5"
        />
      </div>
      <p className="text-left text-sm leading-snug text-gray-600 dark:text-gray-400">
        You&rsquo;ll talk with{' '}
        <span className="font-semibold text-gray-900 dark:text-gray-100">Jeremy Garrell</span>
        <br />
        Founder and principal engineer
      </p>
    </div>
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
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="pt-6 pb-12 text-center sm:pt-10 sm:pb-16"
        >
          <h1
            id="hero-heading"
            className="text-3xl leading-tight font-extrabold tracking-tight text-balance text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100"
          >
            Your business requirements, shipped as working software.
          </h1>
          <div className="bg-gold mx-auto mt-6 h-px w-12" />
          <p className="mt-6 text-lg text-balance text-gray-600 sm:text-xl dark:text-gray-400">
            Technical leadership when you need it, without hiring a full-time CTO.
          </p>
          <div className="mt-16 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-primary-900 hover:bg-gold/90 block w-full rounded-md px-8 py-4 text-center text-base font-semibold shadow-sm transition-colors duration-200 sm:w-auto"
            >
              Scope your project in a 30-min call
            </a>
            <ConsultByline />
          </div>
        </section>

        {/* Social proof */}
        <KeyStats stats={HOME_STATS} />
        <SupportedOrgs />
      </div>
    </>
  )
}
