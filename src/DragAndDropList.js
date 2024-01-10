import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CreateTask } from "./Component/CreateTask";
import { ListTask } from "./Component/ListTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const DragAndDropList = () => {
  const [tasks, settasks] = useState("");

  console.log("mmmm>>>>>>", tasks);

  useEffect(() => {
    settasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {" "}
        <div>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "blue",
              height: "100px",
            }}
          >
            <CreateTask tasks={tasks} settasks={settasks} />
          </div>

          <div
            style={{
              marginTop: "100px",
              backgroundColor: "yellow",
              height: "100px",
            }}
          >
            <ListTask tasks={tasks} settasks={settasks} />
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default DragAndDropList;
