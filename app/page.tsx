import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Home' })

export default function HomePage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Custom Software. Strategic Growth.
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          We build custom software solutions designed to meet your unique needs. Transform your
          business. Optimize your workflows.
        </p>
      </div>

      <div className="space-y-8 py-12">
        <section className="prose dark:prose-invert max-w-none">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            What We Offer
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Automation & Workflows
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Streamline your business processes with custom automation tools that reduce manual
                  work and increase efficiency.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Android Application Development
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Native Android applications built with Kotlin or Java, designed for performance,
                  scalability, and seamless integration with your backend systems and services.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Database Solutions
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Efficient database design and optimization to ensure your data is structured,
                  accessible, and performs at scale.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Web Applications & APIs
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Custom web applications built with modern technologies and robust RESTful APIs
                  that integrate seamlessly with your existing systems to deliver scalable, secure,
                  and user-friendly solutions.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Cloud Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cloud-native solutions leveraging AWS, GCP, or DigitalOcean to provide scalable
                  infrastructure and reliable deployment pipelines.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="absolute right-0 bottom-0 opacity-10">
                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="#cfa821">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div className="relative">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Legacy System Modernization
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Transform outdated systems into modern, maintainable solutions that align with
                  current best practices and technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="prose dark:prose-invert max-w-none pt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Our Approach</h2>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
            We work closely with you to understand your business needs, technical requirements, and
            long-term goals. Our development process emphasizes clear communication, iterative
            delivery, and quality code that's maintainable and scalable for years to come.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
            <li>Requirements analysis and technical planning</li>
            <li>Agile development with regular updates</li>
            <li>Thorough testing and quality assurance</li>
            <li>Deployment and ongoing support</li>
          </ul>
        </section>

        <section className="pt-12 pb-8">
          <div className="border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20 rounded-lg border p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Schedule a free consultation to discuss your custom software development needs. Let's
              explore how we can help transform your business with the right technology solutions.
            </p>
            <a
              href="https://calendly.com/jeremy-garrell/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 inline-block rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:shadow-xl"
            >
              Book a Consultation
            </a>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Free 30-minute consultation • No commitment required
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
