export function ProductFilters({ activeFilter, onFilterChange }) {
  const filters = [
    { label: 'Todos',       value: 'all' },
    { label: 'Phones',      value: 'phones' },
    { label: 'Laptops',     value: 'laptops' },
    { label: 'Tablets',     value: 'tablets' },
    { label: 'Wearables',   value: 'wearables' },
    { label: 'Accesorios',  value: 'accesorios' },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.value
              ? 'bg-cyan-500 text-gray-950'
              : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}