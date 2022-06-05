import styles from "./styles.module.css";
import trashIcon from "../../assets/trash-icon.svg";
import checkIcon from "../../assets/check-icon.svg";
import { useEffect, useState } from "react";

interface TaskItemProps {
  id: string;
  title: string;
  isDone: boolean;
  onDelete: (id: string) => void;
  onCheck: (id: string, newChanged: boolean) => void;
}

export function TaskItem({
  id,
  title,
  isDone,
  onDelete,
  onCheck,
}: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    onCheck(id, !isChecked);
  };

  useEffect(() => {
    setIsChecked(isDone);
  }, []);

  return (
    <div className={styles.taskItemContainer}>
      <div className={styles.taskItemContent}>
        <div className={styles.taskItemContentLeading}>
          <button
            className={`${styles.checkBox} ${isChecked && styles.active}`}
            onClick={handleCheck}
          >
            {isChecked && <img src={checkIcon} alt="check icon" />}
          </button>
          <p>{title}</p>
        </div>
        <button className={styles.deleteButton} onClick={() => onDelete(id)}>
          <img src={trashIcon} alt="Ícone de uma lixeira" />
        </button>
      </div>
    </div>
  );
}
