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
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-primary p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        value={currentTaskText}
        onChange={(e) => setCurrentTaskText(e.target.value)}
        required
        className="w-full p-3 border border-secondary rounded-lg bg-dark focus:outline-none focus:ring-2 focus:ring-highlight"
        placeholder="Digite a tarefa"
      />
      <input
        type="datetime-local"
        value={currentTaskDate}
        onChange={(e) => setCurrentTaskDate(e.target.value)}
        required
        className="w-full p-3 border border-secondary rounded-lg bg-dark focus:outline-none focus:ring-2 focus:ring-highlight"
      />
      <button
        type="submit"
        className="bg-accent text-primaryDark rounded-lg px-4 py-2 font-medium hover:bg-accent-hover">
        Adicionar
      </button>
    </form>

  );
};

export default TaskForm;
