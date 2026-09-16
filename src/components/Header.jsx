function Header({ onPopularClick }) {
  return (
    <header className="flex justify-between items-center px-[6%] py-5 bg-panel border-b border-border sticky top-0 z-50">
      <h1 className="font-display italic font-semibold text-accent text-2xl tracking-wide">
        MovieHub
      </h1>

      <nav className="flex items-center gap-5">
        <a
          href="#home"
          className="text-white no-underline hover:text-accent transition-colors"
        >
          Home
        </a>

        <button
          type="button"
          onClick={onPopularClick}
          className="text-white bg-transparent border-none hover:text-accent transition-colors cursor-pointer"
        >
          Popular
        </button>
      </nav>
    </header>
  )
}

export default Header