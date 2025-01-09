const TaskForm = ({
  currentTaskText,
  setCurrentTaskText,
  currentTaskDate,
  setCurrentTaskDate,
  handleAddTask,
}: {
  currentTaskText: string;
  setCurrentTaskText: (value: string) => void;
  currentTaskDate: string;
  setCurrentTaskDate: (value: string) => void;
  handleAddTask: (e: React.FormEvent) => void;
}) => {
  return (
    <form
      onSubmit={handleAddTask}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        value={currentTaskText}
        onChange={(e) => setCurrentTaskText(e.target.value)}
        required
        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite a tarefa"
      />
      <input
        type="datetime-local"
        value={currentTaskDate}
        onChange={(e) => setCurrentTaskDate(e.target.value)}
        required
        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
      >
        Adicionar ➕
      </button>
    </form>
  );
};

export default TaskForm;
