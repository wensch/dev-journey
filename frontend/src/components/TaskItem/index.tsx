import { useState } from "react";

interface ITasks {
  text: string;
  date: string;
}

const TaskItem = ({
  indice,
  task,
  isEditing,
  startEditing,
  saveEdit,
  removeTask,
}: {
  indice: number;
  task: ITasks;
  isEditing: boolean;
  startEditing: (index: number) => void;
  saveEdit: (text: string, date: string, index: number) => void;
  removeTask: (index: number) => void;
}) => {
  const [editText, setEditText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.date);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const today = new Date().toDateString();
    return d.toDateString() === today
      ? `Hoje, às ${d.getHours()}h${d.getMinutes()}`
      : d.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
  };

  return (
    <li
      className={`p-6 bg-primary rounded-lg shadow-md ${new Date(task.date).valueOf() < Date.now() ? 'border-accent border' : 'border-secondary'
        }`}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!editText.trim()) {
              alert('O texto da tarefa não pode ser vazio.');
              return;
            }
            if (new Date(editDate) < new Date()) {
              alert('A data não pode ser no passado.');
              return;
            }
            saveEdit(editText, editDate, indice);
          }}
        >
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full mb-3 p-3 border border-secondary rounded-lg bg-dark text-white focus:outline-none focus:ring-2 focus:ring-highlight"
          />
          <input
            type="datetime-local"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="w-full mb-3 p-3 border border-secondary rounded-lg bg-dark text-white focus:outline-none focus:ring-2 focus:ring-highlight"
          />
          <button
            type="submit"
            className="w-full bg-highlight hover:bg-accent text-dark font-bold py-3 rounded-lg transition duration-300"
          >
            Salvar
          </button>
        </form>
      ) : (
        <>
          <span
            className="block text-lg font-bold mb-4 text-highlight hover:underline cursor-pointer text-secondary"
            onClick={() => startEditing(indice)}
          >
            {task.text}
          </span>
          <span className="block mb-4 text-sm text-secondary">{formatDate(task.date)}</span>
          <button
            onClick={() => removeTask(indice)}
            className="bg-accent hover:bg-highlight text-dark py-2 px-4 rounded-lg font-bold transition duration-300"
          >
            Remover
          </button>
        </>
      )}
    </li>

  );
};

export default TaskItem;
