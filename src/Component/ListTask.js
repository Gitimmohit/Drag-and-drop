import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

export const ListTask = ({ tasks, settasks }) => {
  const [todos, settodos] = useState([]);
  const [inProgress, setinProgress] = useState([]);
  const [closed, setclosed] = useState([]);

  useEffect(() => {
    if (tasks !== "") {
      const ftodos = tasks?.filter((task) => task.status === "TUDO");
      const finprogress = tasks?.filter((task) => task.status === "inprogress");
      const fclosed = tasks?.filter((task) => task.status === "closed");

      settodos(ftodos);
      setinProgress(finprogress);
      setclosed(fclosed);
    }
  }, [tasks]);
  const statuses = ["TUDO", "inprogress", "closed"];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          todos={todos}
          settasks={settasks}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};
//For section
export const Section = ({
  status,
  tasks,
  settasks,
  inProgress,
  closed,
  todos,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (moniter) => ({
      isOver: !!moniter.isOver(),
    }),
  }));

  let text = "ToDo";
  let taskTomap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    taskTomap = inProgress;
  }

  if (status === "closed") {
    text = "closed";
    taskTomap = closed;
  }

  const addItemToSection = (id) => {
    settasks((prev) => {
      console.log("previous>>>>>>", prev);
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      alert("task has been change");
      return mTasks;
    });
  };

  return (
    <div ref={drop}>
      <Header text={text} count={taskTomap?.length} />
      {taskTomap?.length > 0 &&
        taskTomap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} settasks={settasks} />
        ))}
    </div>
  );
};

//For header
function Header({ text, count }) {
  return (
    <div>
      {text}
      <div>{count}</div>
    </div>
  );
}

function Task({ task, tasks, settasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (moniter) => ({
      isDragging: !!moniter.isDragging(),
    }),
  }));

  console.log("isDragging>>>>>", isDragging);

  const hadleRemove = (id) => {
    const ftask = tasks?.filter((t) => t.id !== id);
    settasks(ftask);
    localStorage.setItem("tasks", JSON.stringify(ftask));
  };

  return (
    <div style={{ display: "flex" }} ref={drag}>
      <p>{task.name}</p>
      <button onClick={() => hadleRemove(task.id)}>delete</button>
    </div>
  );
}

export default ListTask;
