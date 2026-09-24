import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center gap-4 w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="shrink-0">
        <div className="flex items-center justify-between">
          <Image
            src="/static/favicons/goldsymbol.png"
            alt="Logo"
            width={48}
            height={48}
            className="mr-4"
          />
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-xl font-semibold whitespace-nowrap sm:block xl:text-2xl">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex min-w-0 items-center space-x-4 leading-5 sm:-mr-6 xl:space-x-6">
        <nav
          aria-label="Main"
          className="no-scrollbar hidden max-w-40 items-center gap-x-2 overflow-x-auto sm:flex md:max-w-80 lg:max-w-96 xl:gap-x-4"
        >
          {headerNavLinks
            .filter((link) => !link.mobileOnly)
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-700 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <a
          href={`tel:${siteMetadata.phoneE164}`}
          aria-label={`Call ${siteMetadata.phone}`}
          className="group bg-mint text-primary-800 hover:text-primary-700 dark:hover:text-primary-400 dark:text-primary-300 xl:hover:text-primary-700 xl:dark:hover:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-md font-semibold xl:h-auto xl:w-auto xl:gap-2 xl:bg-transparent xl:text-gray-900 dark:bg-gray-900 xl:dark:bg-transparent xl:dark:text-gray-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-800 group-hover:text-primary-700 dark:text-primary-300 dark:group-hover:text-primary-400 h-5 w-5 xl:h-[18px] xl:w-[18px]"
            aria-hidden="true"
          >
            <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="hidden whitespace-nowrap xl:inline">{siteMetadata.phone}</span>
        </a>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
