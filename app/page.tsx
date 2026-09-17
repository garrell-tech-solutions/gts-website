import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { KeyStats, SupportedOrgs } from '@/components/SocialProof'

export const metadata = genPageMetadata({
  title: 'Custom Software and Fractional CTO Services',
  description:
    'Garrell Tech Solutions turns business requirements into working software. Senior product ownership and engineering for growing businesses, proven on FBI and Army programs.',
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

// Set to the headshot path (e.g. '/static/images/jeremy-garrell.jpg') once it is uploaded.
// While unset, the photo slot renders a placeholder in dev and is hidden in production.
const HEADSHOT_SRC: string | null = null

const CONSULT_URL = 'https://calendly.com/jeremy-garrell/30min'

function HeroPhoto() {
  if (!HEADSHOT_SRC && process.env.NODE_ENV === 'production') return null

  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:w-96 lg:max-w-none lg:shrink-0">
      {HEADSHOT_SRC ? (
        <Image
          src={HEADSHOT_SRC}
          alt="Jeremy Garrell, founder of Garrell Tech Solutions"
          width={480}
          height={600}
          priority
          className="border-t-gold aspect-[4/5] w-full rounded-lg border-t-4 object-cover"
        />
      ) : (
        <div className="border-primary-800/30 dark:border-primary-300/30 text-primary-800/70 dark:text-primary-300/70 flex aspect-[4/5] w-full items-center justify-center rounded-lg border-2 border-dashed text-sm">
          Headshot goes here (set HEADSHOT_SRC in app/page.tsx)
        </div>
      )}
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
          className="flex flex-col-reverse gap-10 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:flex-row lg:items-center lg:gap-16"
        >
          <div className="lg:flex-1">
            <h1
              id="hero-heading"
              className="max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100"
            >
              Your business requirements, shipped as working software.
            </h1>
            <div className="bg-gold mt-6 h-px w-12" />
            <p className="mt-6 max-w-xl text-lg text-gray-600 sm:text-xl dark:text-gray-400">
              Senior product ownership and engineering for growing businesses, backed by a decade of
              delivery on FBI and Army programs.
            </p>
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-primary-900 hover:bg-gold/90 mt-12 block rounded-md px-8 py-4 text-center text-base font-semibold shadow-sm transition-colors duration-200 sm:inline-block"
            >
              Book a 30-minute consult →
            </a>
            <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
              Federal buyer?{' '}
              <Link
                href="/capability-statement"
                className="text-primary-800 dark:text-primary-300 font-medium hover:underline"
              >
                View the capability statement
              </Link>
            </p>
          </div>
          <HeroPhoto />
        </section>

        {/* Social proof */}
        <KeyStats />
        <SupportedOrgs />
      </div>
    </>
  )
}
