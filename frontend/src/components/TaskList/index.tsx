import TaskItem from "../TaskItem";

interface ITasks {
  text: string;
  date: string;
}

const TaskList = ({
  tasks,
  taskEdited,
  setTaskEdited,
  saveEdit,
  removeTask,
}: {
  tasks: ITasks[];
  taskEdited: number;
  setTaskEdited: (index: number) => void;
  saveEdit: (text: string, date: string, index: number) => void;
  removeTask: (index: number) => void;
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
      {tasks.map((task, i) => (
        <TaskItem
          key={i}
          indice={i}
          task={task}
          isEditing={i === taskEdited}
          startEditing={setTaskEdited}
          saveEdit={saveEdit}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
