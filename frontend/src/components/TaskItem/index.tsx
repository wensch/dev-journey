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
      className={`p-6 bg-gray-800 rounded-lg shadow-md ${
        new Date(task.date).valueOf() < Date.now()
          ? "border-red-500 border"
          : "border-gray-600"
      }`}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!editText.trim()) {
              alert("O texto da tarefa não pode ser vazio.");
              return;
            }
            if (new Date(editDate) < new Date()) {
              alert("A data não pode ser no passado.");
              return;
            }
            saveEdit(editText, editDate, indice);
          }}
        >
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full mb-3 p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="w-full mb-3 p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Salvar
          </button>
        </form>
      ) : (
        <>
          <span
            className="block text-lg font-bold mb-4 hover:underline cursor-pointer"
            onClick={() => startEditing(indice)}
          >
            {task.text}
          </span>
          <span className="block mb-4 text-sm text-gray-400">{formatDate(task.date)}</span>
          <button
            onClick={() => removeTask(indice)}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-bold transition duration-300"
          >
            ✖️ Remover
          </button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
