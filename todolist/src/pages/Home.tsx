import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskOrder from "../components/TaskOrder";
import TaskList from "../components/TaskList";


interface ITasks {
  text: string;
  date: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [currentTaskText, setCurrentTaskText] = useState<string>("");
  const [currentTaskDate, setCurrentTaskDate] = useState<string>("");
  const [taskEdited, setEditTaks] = useState<number>(-1);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [itemsToShow, setItemsToShow] = useState<number>(4);

  const updateTasks = (arr: ITasks[]) => {
    localStorage.setItem("Tarefas", JSON.stringify(arr));
    setTasks(arr);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("Tarefas");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTaskText.trim() !== "") {
      const updatedTasks = [...tasks, { text: currentTaskText, date: currentTaskDate }];
      setTasks(updatedTasks);
      setCurrentTaskText("");
      setCurrentTaskDate("");
      updateTasks(updatedTasks);
    }
  };

  const removeTask = (index: number) => {
    const newList = tasks.filter((_el, i) => i !== index);
    setTasks(newList);
    updateTasks(newList);
  };

  const saveEdit = (text: string, date: string, index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { text, date };
    setTasks(updatedTasks);
    updateTasks(updatedTasks);
    setEditTaks(-1);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (activeFilter === "overdue") {
      filtered = tasks.filter((el) => new Date(el.date) < new Date());
    } else if (activeFilter === "today") {
      filtered = tasks.filter(
        (el) => new Date(el.date).toDateString() === new Date().toDateString()
      );
    } else if (activeFilter === "future") {
      filtered = tasks.filter((el) => new Date(el.date) > new Date());
    }

    if (searchText) {
      filtered = filtered.filter((el) =>
        el.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const getVisibleTasks = () => {
    return getFilteredTasks().slice(0, itemsToShow);
  };

  const loadMoreTasks = () => {
    if (itemsToShow < getFilteredTasks().length) {
      setItemsToShow((prev) => prev + 4);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreTasks();
    }
  };

  const orderTasks = (value: string) => {
    let sortedTasks = [...getFilteredTasks()];
    switch (value) {
      case "az":
        sortedTasks.sort((a, b) =>
          a.text.toLowerCase().localeCompare(b.text.toLowerCase())
        );
        break;
      case "za":
        sortedTasks.sort((a, b) =>
          b.text.toLowerCase().localeCompare(a.text.toLowerCase())
        );
        break;
      case "mais_recente":
        sortedTasks.sort(
          (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
        );
        break;
      case "menos_recente":
        sortedTasks.sort(
          (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );
        break;
      default:
        break;
    }

    setTasks(sortedTasks);
  };

  return (
    <main
      className="w-full max-w-full pt-56 task-list-container overflow-y-auto"
      onScroll={handleScroll}
    >
      <TaskForm
        currentTaskText={currentTaskText}
        setCurrentTaskText={setCurrentTaskText}
        currentTaskDate={currentTaskDate}
        setCurrentTaskDate={setCurrentTaskDate}
        handleAddTask={handleAddTask}
      />
      <TaskFilter
        activeFilter={activeFilter}
        handleFilter={setActiveFilter}
        handleSearch={setSearchText}
      />
      <TaskOrder handleOrderChange={orderTasks} />
      <TaskList
        tasks={getVisibleTasks()}
        taskEdited={taskEdited}
        setTaskEdited={setEditTaks}
        saveEdit={saveEdit}
        removeTask={removeTask}
      />
    </main>
  );
}

export default Home