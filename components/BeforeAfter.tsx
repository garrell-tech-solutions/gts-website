// Decorative hero illustration: a messy spreadsheet becoming a clean app. Hidden from
// assistive tech because the hero heading already says what it shows.

type Cell = { text: string; flag?: boolean }

const SHEET_HEADER = ['Customer', 'Status', 'Due', 'Notes']

const SHEET_ROWS: Cell[][] = [
  [{ text: 'Smith Co' }, { text: '??', flag: true }, { text: '#REF!' }, { text: 'see email' }],
  [{ text: 'smith co.' }, { text: 'done?' }, { text: '3/14' }, { text: 'call back' }],
  [{ text: 'Ramirez' }, { text: 'pending', flag: true }, { text: 'TBD' }, { text: 'ask Dana' }],
  [{ text: '' }, { text: '' }, { text: '#VALUE!' }, { text: '' }],
  [{ text: 'Lee' }, { text: 'open' }, { text: '3/9' }, { text: 'dup of row 12?' }],
]

const ORDERS = [
  {
    name: 'Smith Co',
    due: 'Due Mar 14',
    status: 'Shipped',
    tone: 'bg-primary-100 text-primary-700',
  },
  {
    name: 'Ramirez Supply',
    due: 'Due Mar 18',
    status: 'In progress',
    tone: 'bg-amber-100 text-amber-900',
  },
  {
    name: 'Lee & Partners',
    due: 'Due Mar 21',
    status: 'Scheduled',
    tone: 'bg-gray-100 text-gray-700',
  },
]

const LABEL = 'mb-3 text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm'
const FRAME = 'overflow-hidden rounded-lg border border-gray-300 md:h-[300px]'

function Spreadsheet() {
  return (
    <div className={`${FRAME} bg-gray-50 text-gray-700`}>
      <div className="flex gap-0.5 border-b border-gray-300 bg-gray-100 px-2.5 pt-2 text-xs">
        <span className="rounded-t border border-b-0 border-gray-300 bg-white px-3 py-1.5 whitespace-nowrap">
          Orders_FINAL_v3.xlsx
        </span>
        <span className="px-3 py-1.5 whitespace-nowrap text-gray-500">Schedule (copy)</span>
        <span className="hidden px-3 py-1.5 whitespace-nowrap text-gray-500 xl:inline">
          DO NOT EDIT
        </span>
      </div>
      <div className="grid grid-cols-[2rem_repeat(4,minmax(0,1fr))] text-xs">
        <div className="border border-gray-200 bg-gray-100" />
        {SHEET_HEADER.map((h) => (
          <div key={h} className="border border-gray-200 bg-gray-100 p-1.5 font-semibold">
            {h}
          </div>
        ))}
        {SHEET_ROWS.map((row, i) => (
          <div key={i} className="contents">
            <div className="border border-gray-200 bg-gray-100 p-1.5">{i + 2}</div>
            {row.map((cell, j) => (
              <div
                key={j}
                className={`truncate border border-gray-200 p-1.5 ${cell.flag ? 'bg-amber-100' : ''}`}
              >
                {cell.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function OrdersApp() {
  return (
    <div
      className={`${FRAME} border-t-gold flex flex-col gap-3 border-t-4 bg-white p-5 text-gray-900`}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Orders</p>
        <p className="bg-primary-800 rounded px-2.5 py-1 text-xs font-semibold text-white">
          + New order
        </p>
      </div>
      {ORDERS.map((o) => (
        <div
          key={o.name}
          className="flex items-center gap-3 rounded-lg border border-gray-200 px-3.5 py-3 text-sm"
        >
          <span className="min-w-0 grow truncate font-semibold">{o.name}</span>
          <span className="hidden whitespace-nowrap text-gray-600 sm:inline md:hidden xl:inline">
            {o.due}
          </span>
          <span className={`rounded px-2 py-1 text-xs font-semibold whitespace-nowrap ${o.tone}`}>
            {o.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <div
      aria-hidden="true"
      className="mt-12 grid grid-cols-1 items-start gap-4 text-left md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-0"
    >
      <div>
        <p className={`${LABEL} text-gray-600 dark:text-gray-400`}>Today</p>
        <Spreadsheet />
      </div>
      <div className="flex items-center justify-center md:h-[330px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold h-10 w-10 rotate-90 md:h-14 md:w-14 md:rotate-0"
        >
          <path d="M4 12h15" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </div>
      <div>
        <p className={`${LABEL} text-primary-800 dark:text-primary-300`}>With your software</p>
        <OrdersApp />
      </div>
    </div>
  )
}
