const TableWrapper = ({ children }) => {
  return (
    // A focusable scroll region lets keyboard users scroll a wide table (WCAG 2.1.1).
    <div
      className="w-full overflow-x-auto"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="region"
      aria-label="Scrollable table"
    >
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
