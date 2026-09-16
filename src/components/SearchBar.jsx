function SearchBar({ query, onQueryChange, onSearch, searching }) {
  return (
    <form className="flex max-w-[650px] mx-auto" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1 px-5 py-4 border border-border border-r-0 rounded-l bg-panel text-white placeholder-muted outline-none text-base"
      />

      <button
        type="submit"
        disabled={searching}
        className="px-6 py-4 bg-accent text-accent-ink font-semibold rounded-r border-none cursor-pointer hover:bg-accent-hover transition-colors disabled:opacity-60"
      >
        {searching ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar