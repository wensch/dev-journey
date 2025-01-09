const TaskFilter = ({
  handleSearch,
  handleFilter,
  activeFilter,
}: {
  handleSearch: (value: string) => void;
  handleFilter: (value: string) => void;
  activeFilter: string;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-12">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
        placeholder="Buscar tarefas..."
        className="border p-2 rounded bg-dark text-white focus:outline-none focus:ring-2 focus:ring-highlight"
      />
      <div className="flex gap-2 mt-4">
        {['all', 'overdue', 'today', 'future'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`py-2 px-4 rounded border ${activeFilter === filter
                ? 'bg-accent text-white border-highlight'
                : 'bg-dark border-secondary'
              }`}
          >
            {filter === 'all' ? 'Todas' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>

  );
};

export default TaskFilter;
