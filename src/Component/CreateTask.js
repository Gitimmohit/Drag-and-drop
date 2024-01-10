import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';




export const CreateTask = ({ tasks, settasks }) => {
  const [task, setTask] = useState(
    {
      id: "",
      name: "",
      status: "TUDO"
    });

  console.log("first>>>", task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task?.name?.length < 3)
      return alert("Enter Name")
  
      settasks(() => {
        const list = [task];
        localStorage.setItem("tasks", JSON.stringify(list));
        return list;
      });

setTask({
  id: "",
  name: "",
  status: "TUDO"
});

      
  };  

    return (
      <form onSubmit={handleSubmit}>
        <input type={"text"}
          value={task.name}
          onChange={(e) => {
            setTask({ ...task, id: uuidv4(), name: e.target.value })
          }}
        />
        <button>CreateTask</button>
      </form>
    )
  }
