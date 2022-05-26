import { useEffect, useState } from "react";

function App() {

  const savedTaskList = localStorage.getItem("task");

  let [task, setTask] = useState("");

  //lazy state, if no saved task list in localstorage then return empty [] else get saved task list
  let [taskList, setTaskList] = useState(() => {
    if (savedTaskList) {
      return JSON.parse(savedTaskList);
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem('task', JSON.stringify(taskList))
  }, [taskList])

  function handleAddTask(e) {
    e.preventDefault();
    if (task.trim() !== "") {
      let newTask = {
        id: Date.now() + Math.random(),
        label: task,
        completed: false
      };

      let newList = [...taskList];
      newList.push(newTask);
      setTaskList(newList);
      setTask("");
    }else{
      alert("Empty task is not allowed! Go think of something to do!");
    }
  }

  function handleCheckedChange(item) {
    let newTaskList = taskList.map((taskItem) => {
      if (taskItem.id === item.id) {
        return ({
          id: taskItem.id,
          label: taskItem.label,
          completed: !taskItem.completed
        })
      } else {
        return (taskItem);
      }
    });
    setTaskList(newTaskList);
  }

  function handleDelete(item) {
    let newTaskList = taskList.filter((taskItem) => taskItem.id !== item.id);
    setTaskList(newTaskList);
  }

  function handleClearAll() {
    setTaskList([]);
  }

  function handleClearAllToDo() {
    let removedAllToDoList = taskList.filter((taskItem) => taskItem.completed === true);
    setTaskList(removedAllToDoList);
  }

  function handleClearAllCompleted() {
    let removedAllCompletedList = taskList.filter((taskItem) => taskItem.completed === false);
    setTaskList(removedAllCompletedList);
  }

  return (
    <div className="App">
      <h1 style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>To do list</h1>
      <button style={{}} onClick={() => handleClearAll()}>Clear all</button>
      <h2 style={{ textDecoration: "underline" }}>Add Task</h2>
      <label htmlFor="task-input">Task: </label>

      <form onSubmit={handleAddTask}>
        <input 
          id="task-input"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button style={{marginLeft: "15px"}} type="submit" alt="Add task"> Add </button>
      </form>
      <br></br>
      <div className="ToDo">
        <h2 style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>To Do</h2>
        <button onClick={() => handleClearAllToDo()}>Clear all to do</button>
        <ul>
          {taskList.filter((item) => item.completed !== true).map((item) => {
            return (
              <div key={item.id}>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckedChange(item)}
                    checked={item.completed}
                  />
                  <span>{item.label}</span>
                  <button onClick={() => handleDelete(item)}>Delete Task</button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="Completed">
        <h2 style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>Completed</h2>
        <button onClick={() => handleClearAllCompleted()}>Clear all completed</button>
        <ul>
          {taskList.filter((item) => item.completed === true).map((item) => {
            return (
              <div key={item.id}>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckedChange(item)}
                    checked={item.completed}
                  />

                  <span style={{ textDecoration: "line-through" }}>{item.label}</span>
                  <button onClick={() => handleDelete(item)}>Delete Task</button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

    </div >
  );
}

export default App;

