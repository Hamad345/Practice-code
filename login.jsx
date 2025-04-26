import React, { useState } from "react";

const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission refresh

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      alert("Login successful!");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={styles.form}>
          <h2>Login</h2>
          <div style={styles.inputGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

// Basic styles for the UI
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default App;