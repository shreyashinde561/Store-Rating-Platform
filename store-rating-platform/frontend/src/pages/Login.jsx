import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("ADMIN");

  const handleLogin = async () => {
    console.log("Login button clicked");

    try {
      console.log("Sending request...");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Backend Response:", res.data);

      const token = res.data.access_token;
      const role = res.data.user.role;
      const user = res.data.user;

      // Check selected role
      if (role !== selectedRole) {
        alert(
          `This account belongs to "${role}". Please select the correct login option.`
        );
        return;
      }

      // Save data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful!");

      // Redirect
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else if (role === "USER") {
        window.location.href = "/user";
      } else if (role === "STORE_OWNER") {
        window.location.href = "/owner";
      } else {
        alert("Unknown user role");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (err.response) {
        console.log("Backend Error:", err.response.data);

        alert(
          err.response.data.message || "Invalid email or password"
        );
      } else {
        alert("Backend not responding");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Store Rating Platform
        </h1>

        <p style={styles.subtitle}>
          Sign in to continue
        </p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={styles.input}
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value)
          }
        >
          <option value="ADMIN">
            Login as Admin
          </option>

          <option value="USER">
            Login as User
          </option>

          <option value="STORE_OWNER">
            Login as Store Owner
          </option>
        </select>

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={styles.demoTitle}>
          Demo Accounts
        </p>

        <div style={styles.demoBox}>
          <p>
            <strong>Admin:</strong><br />
            admin@test.com
          </p>

          <p>
            <strong>User:</strong><br />
            user@test.com
          </p>

          <p>
            <strong>Store Owner:</strong><br />
            owner@test.com
          </p>

          <p>
            Password:
            <br />
            Password@1
          </p>
        </div>

        <p style={styles.footer}>
          Store Rating Platform © 2026
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "400px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  title: {
    marginBottom: "10px",
    color: "#333",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  demoTitle: {
    marginTop: "25px",
    fontWeight: "bold",
    color: "#444",
  },

  demoBox: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "10px",
    textAlign: "left",
    fontSize: "13px",
    color: "#555",
  },

  footer: {
    marginTop: "20px",
    color: "#888",
    fontSize: "12px",
  },
};