import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "./Navbar.css"; // optional styling

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">‧˚ ☁️⋅♡🪐༘⋆ </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard">Tasks</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        ִֶָ𓂃 ࣪˖ ִֶָ🐇་༘࿐
      </ul>
    </nav>
  );
}

export default Navbar;
