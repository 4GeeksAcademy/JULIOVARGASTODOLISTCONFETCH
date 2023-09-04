import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);

  const createUser = async () => {
    try {
      const result = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/julio512",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        }
      );
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListTareas = async () => {
    try {
      const result = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/julio512"
      );

      const data = await result.json();
      setLista(data);
    } catch (error) {
      console.log(error, "obteniendo tareas");
    }
  };

  const updateTareas = async () => {
    try {
      const result = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/julio512",
        {
          method: "PUT",
          body: JSON.stringify([...lista, { label: tarea, done: false }]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createUser();
    getListTareas();
  }, []);

  const confirmarTarea = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (tarea == "") {
        alert("escribi algo!");
      } else {
        setLista([...lista, { label: tarea, done: false }]);
        console.log(lista);
        setTarea("");
        updateTareas();
      }
    }
  };

  const deleteHandler = async (id) => {
    const tasksWithoutDeleted = lista.filter((ele, index) => index !== id);
    try {
      const result = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/julio512",
        {
          method: "PUT",
          body: JSON.stringify(tasksWithoutDeleted),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      setLista(tasksWithoutDeleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>ToDoList</h1>
        <input
          type="text"
          placeholder="tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          onKeyDown={(e) => confirmarTarea(e)}
          required
        />
      </div>
      <div>
        <ul>
          {lista.map((ele, index) => (
            <li key={index}>
              {ele.label}
              <button type="button" onClick={() => deleteHandler(index)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
