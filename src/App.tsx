import { PlusCircle, ClipboardText } from "phosphor-react";

import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Task } from "./components/Task";

interface ITaskProps {
  id: number;
  text: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [countTasks, setCountTasks] = useState(0);
  const [countComplete, setCountComplete] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.random(),
      text: newTaskText,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
    setCountTasks(countTasks + 1);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(id: number) {
    const commentsWithoutDeleteOne = tasks.filter((item) => {
      return item.id !== id;
    });

    setTasks(commentsWithoutDeleteOne);
    setCountTasks(countTasks - 1);
  }

  function completeTask(id: number) {
    const statusTasks = tasks.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );

    setTasks(statusTasks);
    setCountComplete(countComplete + 1);
  }

  return (
    <div className={styles.home}>
      <Header />

      <form onSubmit={handleCreateNewTask}>
        <input
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
        />
        <button disabled={!newTaskText}>
          <div>
            Criar
            <PlusCircle />
          </div>
        </button>
      </form>

      <div className={styles.taskCountContainer}>
        <div className={styles.createTaskContainer}>
          <p>Tarefas criadas</p>
          <p className={styles.tasksCount}>{countTasks}</p>
        </div>
        <div>
          <p>Concluídas</p>
          <p className={styles.tasksCount}>
            {countComplete} de {countTasks}
          </p>
        </div>
      </div>

      <div className={styles.taskContainer}>
        {!countTasks ? (
          <div className={styles.tasksEmpty}>
            <ClipboardText />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <div>
            {tasks.map((item) => {
              return (
                <Task
                  id={item.id}
                  text={item.text}
                  isComplete={item.isComplete}
                  key={item.id}
                  onDeleteTask={deleteTask}
                  onCompleteTask={completeTask}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
