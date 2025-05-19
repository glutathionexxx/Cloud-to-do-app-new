import { useState, useEffect } from "react";
import './Dashboard.css';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const taskRef = collection(db, "users", user.uid, "tasks");

    const unsubscribe = onSnapshot(taskRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);

  const addOrUpdateTask = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!input.trim() || !user) return;

    const taskRef = collection(db, "users", user.uid, "tasks");

    if (editingId) {
      const taskDoc = doc(db, "users", user.uid, "tasks", editingId);
      await updateDoc(taskDoc, {
        text: input,
        dueDate,
        priority,
      });
      setEditingId(null);
    } else {
      await addDoc(taskRef, {
        text: input,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date(),
      });
    }

    setInput("");
    setDueDate("");
    setPriority("Medium");
  };

  const deleteTask = async (id) => {
    const user = auth.currentUser;
    const taskDoc = doc(db, "users", user.uid, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const toggleCompleted = async (id, currentStatus) => {
    const user = auth.currentUser;
    const taskDoc = doc(db, "users", user.uid, "tasks", id);
    await updateDoc(taskDoc, { completed: !currentStatus });
  };

  const startEdit = (task) => {
    setInput(task.text);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEditingId(task.id);
  };

  return (
      <div style={{ padding: "30px", backgroundColor: "rgba(255, 255, 255, 0.66)", borderRadius: "8px", width: "300px", justifyContent: "center", alignItems: "center", marginLeft: "40%", marginTop: "80px", maxHeight: "400px" }}>
        <h1>My Tasks</h1>

        <form onSubmit={addOrUpdateTask} style={{ marginBottom: "20px" }}>
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Task description"
              required
              style={{ width: "200px", height: "25px" }}
          />
          <br />
          <br />
          <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: "200px", height: "35px", fontFamily: "'Cute', sans-serif", fontSize: "20px" }}
              required
          />
          <br />
          <br />
          <select
              style={{ width: "200px", height: "35px", fontFamily: "'Cute', sans-serif", fontSize: "20px" }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
          >
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
                    justifyContent: "center",
                    gap: "25px",
                    width: "889px",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                  <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task.id, task.completed)}
                      style={{ width: "20px", height: "20px" }}
                  />
                </div>

                <strong>{task.text}</strong>
                <div>📅 {task.dueDate}</div>
                <div>🔺 Priority: {task.priority}</div>
                <button onClick={() => startEdit(task)} style={{ backgroundColor: "rgba(240, 143, 69, 0.56)" }}>Edit</button>
                <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: "rgba(242, 29, 29, 0.38)" }}>Delete</button>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Dashboard;
