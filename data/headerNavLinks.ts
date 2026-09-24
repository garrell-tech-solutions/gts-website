// mobileOnly links stay in the mobile menu but are left out of the desktop header, which
// has no room for them next to the phone number. The logo already links home.
const headerNavLinks = [
  { href: '/', title: 'Home', mobileOnly: true },
  { href: '/capability-statement', title: 'Capabilities' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags', mobileOnly: true },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
