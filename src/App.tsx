import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { TaskItem } from "./components/TaskItem";
import styles from "./styles.module.css";
import emptyIcon from "./assets/empty-icon.svg";
interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleToggleTask = (id: string, newChanged: boolean) => {
    setTasks((state) => {
      return state.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: newChanged };
        }
        return task;
      });
    });
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((state) => {
      return [...state, newTask];
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks((state) => state.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("@todoList:tasks");
    if (storedTasks && storedTasks !== "[]") {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    saveTask();
  }, [tasks]);

  const saveTask = () => {
    localStorage.setItem("@todoList:tasks", JSON.stringify(tasks));
  };

  return (
    <div className={styles.container}>
      <Header onCreateTask={(newTask) => handleCreateTask(newTask)} />
      <div className={styles.tasksContainer}>
        <div className={styles.summaryTasks}>
          <div className={styles.tasksCreated}>
            <span>Tarefas criadas</span>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.tasksCompleted}>
            <span>Concluídas</span>
            <span>
              {tasks.filter((task) => task.isDone).length} de {tasks.length}
            </span>
          </div>
        </div>

        <section className={styles.tasksItemsSection}>
          {tasks.length !== 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                onDelete={handleDeleteTask}
                onCheck={handleToggleTask}
              />
            ))
          ) : (
            <div className={styles.tasksItemsSectionEmpty}>
              <img src={emptyIcon} alt="Ícone de livro" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
