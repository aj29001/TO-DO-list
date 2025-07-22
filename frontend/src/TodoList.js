import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    axios.post("http://localhost:8000/api/tasks/", { title: newTitle })
      .then(() => {
        setNewTitle("");
        fetchTasks();
      });
  };

  const toggleComplete = (task) => {
    axios.put(`http://localhost:8000/api/tasks/${task.id}/`, {
      ...task,
      completed: !task.completed,
    }).then(fetchTasks);
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}/`)
      .then(fetchTasks);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>TO-DO List</h1>
      <input
        type="text"
        placeholder="Nový úkol"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addTask}>Přidat</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
