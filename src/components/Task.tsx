import { Check, Circle, Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface ITaskProps {
  text: string;
  id: number;
  isComplete: boolean;
  onCompleteTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({
  text,
  id,
  isComplete,
  onCompleteTask,
  onDeleteTask,
}: ITaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCompleteTask() {
    onCompleteTask(id);
  }

  return (
    <div className={styles.container}>
      <button onClick={!isComplete ? handleCompleteTask : () => {}}>
        {!isComplete ? <Circle /> : <Check className={styles.isComplete} />}
      </button>

      {!isComplete ? (
        <p>{text}</p>
      ) : (
        <p className={styles.textComplete}>{text}</p>
      )}

      <button
        className={styles.isDelete}
        onClick={!isComplete ? handleDeleteTask : () => {}}
      >
        <Trash />
      </button>
    </div>
  );
}
