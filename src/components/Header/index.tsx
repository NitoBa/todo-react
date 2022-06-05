import styles from "./styles.module.css";
import logo from "../../assets/logo.svg";
import plusIcon from "../../assets/plus-icon.svg";
import { useState } from "react";

interface NewTask {
  id: string;
  title: string;
  isDone: boolean;
}

interface HeaderProps {
  onCreateTask: (newTask: NewTask) => void;
}

export function Header({ onCreateTask }: HeaderProps) {
  const [inputText, setInputText] = useState("");

  function handleCreateNewTask() {
    const newTask = {
      id: String(Math.random()),
      title: inputText,
      isDone: false,
    };

    onCreateTask(newTask);
    setInputText("");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  return (
    <header className={styles.container}>
      <img src={logo} alt="Todo list logotipo" />
      <div className={styles.content}>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className={styles.inputText}
            placeholder="Digite uma nova tarefa"
          />
          <button
            disabled={inputText.length === 0}
            onClick={handleCreateNewTask}
          >
            <span>Criar</span>
            <img
              src={plusIcon}
              alt="Icone com um símbolo de soma em volta de um círculo branco"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
