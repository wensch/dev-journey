import { useEffect, useRef, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskOrder from "../components/TaskOrder";
import TaskList from "../components/TaskList";
import Content from "../components/Content";


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

  const mainRef = useRef<HTMLDivElement>(null);

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
    console.log('test scroll', e);
    
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
    <div ref={mainRef} onScroll={handleScroll}>
      <main
        className=" p-4 box-border "
        onScroll={handleScroll}
      >
        <Content 
          title="Bem-vindo à Sua Todo List Personalizada 🚀"
          subtitle=" Na página inicial do nosso sistema de gerenciamento de tarefas, você encontrará diversas funcionalidades que tornam a organização do seu dia mais simples e eficiente. Aqui está um guia completo para aproveitar ao máximo as ferramentas disponíveis:"
          contents={[
            {
              title: "📋 CRUD de Tarefas",
              text: "Com o formulário no topo da página, você pode criar, editar e remover tarefas de maneira simples. Basta inserir o nome da tarefa e a data desejada, e clicar no botão verde “Adicionar”. Para editar, clique na tarefa e altere as informações. Caso não precise mais de uma tarefa, clique em “Remover” para eliminá-la."
            },
            {
              title: "🔍 Busca Rápida",
              text: "Abaixo do formulário, você encontrará um campo de busca que permite localizar tarefas específicas. Basta começar a digitar o nome da tarefa desejada, e o sistema irá filtrar os resultados em tempo real."
            },
            {
              title: "📅 Filtros de Data",
              text: "Abaixo do formulário, vocé encontrará filtros de data, que permitirão que vocé organize suas tarefas por datas especiais, como tarefas de hoje, de amanha, ou de data futura."
            },
            {
              title: "⬆️⬇️ Ordenação Personalizada",
              text: "Na lateral, você encontrará um seletor de ordenação. Ele permite organizar suas tarefas de acordo com suas preferências, como ordem alfabética ou data. Isso facilita a priorização das tarefas de maneira visual e intuitiva."
            }
          ]}
          endText=" Com todas essas funcionalidades, nossa Todo List não é apenas uma ferramenta de organização, mas um aliado poderoso para manter suas tarefas sob controle e alcançar seus objetivos com eficiência. Aproveite! 🎯"
        />
      
        
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
    </div>
  );
}

export default Home