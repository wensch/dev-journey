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
        className="border p-2 rounded"
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleFilter("all")}
          className={`py-2 px-4 rounded border ${
            activeFilter === "all" ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 border-gray-300"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => handleFilter("overdue")}
          className={`py-2 px-4 rounded ${
            activeFilter === "overdue" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Vencidas
        </button>
        <button
          onClick={() => handleFilter("today")}
          className={`py-2 px-4 rounded ${
            activeFilter === "today" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Hoje
        </button>
        <button
          onClick={() => handleFilter("future")}
          className={`py-2 px-4 rounded ${
            activeFilter === "future" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Futuras
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
