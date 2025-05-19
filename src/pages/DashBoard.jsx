import { useState, useEffect } from "react";
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);


  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editingId) {
      // Edit mode
      const updated = tasks.map((task) =>
        task.id === editingId
          ? { ...task, text: input, dueDate, priority }
          : task
      );
      setTasks(updated);
      setEditingId(null);
    } else {
      // Add mode
      const newTask = {
        id: Date.now(),
        text: input,
        dueDate,
        priority,
        completed: false,
      };
      setTasks([newTask, ...tasks]);
    }

    // Reset form
    setInput("");
    setDueDate("");
    setPriority("Medium");
  };

  

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };
  

  

  const startEdit = (task) => {
    setInput(task.text);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEditingId(task.id);
  };

  return (
    <div style={{ padding: "30px" , backgroundColor:"rgba(255, 255, 255, 0.66)" , borderRadius:"8px" , width: "300px", justifyContent: "center", alignItems: "center" , marginLeft:"40%", marginTop:"80px" ,maxHeight:"400px"}}>
      <h1>My Tasks</h1>

      <form onSubmit={addOrUpdateTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Task description"
          required
          style={{width: "200px",height: "25px"}}
        />
        <br />
        <br />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: "200px",height: "35px", fontFamily: "'Cute', sans-serif",fontSize:"20px"}}
          required
        />
        <br />
        <br />
        <select style={{width: "200px",height: "35px", fontFamily: "'Cute', sans-serif",fontSize:"20px"}} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <br />
        <br />
        <button type="submit">{editingId ? "Update" : "Add Task"}</button>
      </form>
      <br />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
    
            fontFamily: "'Cute', sans-serif",
            marginBottom: "10px",
            padding: "10px",
            border: `2px solid ${
              task.priority === "High"
                ? "pink"
                : task.priority === "Medium"
                ? "rgb(243, 178, 98)"
                : "rgb(64, 147, 34)"
            }`,
        
            backgroundColor: task.completed ? "#e0ffe0" : "rgba(255, 255, 255, 0.54)",
            textDecoration: task.completed ? "line-through" : "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",gap: "25px" , width:"889px",textAlign:"center",borderRadius:"30px"


          }}
          
        >
             <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleCompleted(task.id)}
      style={{ width: "20px", height: "20px" }}
    />
  </div>
</div>

          <strong>{task.text}</strong>
          <div>📅 {task.dueDate}</div>
          <div>🔺 Priority: {task.priority}</div>
          <button onClick={() => startEdit(task)} style={{backgroundColor:"rgba(240, 143, 69, 0.56)"}}>Edit</button>
          <button onClick={() => deleteTask(task.id)} style={{backgroundColor:"rgba(242, 29, 29, 0.38)"}}>Delete</button>
        </div>
      ))}
      </div>
    </div>
  );
  
}


export default Dashboard;
