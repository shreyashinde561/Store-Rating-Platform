import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login button clicked");

    try {
      console.log("Sending request...");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Response:", res.data);

      const token = res.data.access_token;
      const role = res.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful!");

      // Role Based Redirect
      if (role === "ADMIN") {
        window.location.href = "/admin";
      } else if (role === "USER") {
        window.location.href = "/user";
      } else if (role === "STORE_OWNER") {
        window.location.href = "/owner";
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      console.log("ERROR:", err);

      if (err.response) {
        console.log(err.response.data);
        alert(err.response.data.message || "Login Failed");
      } else {
        alert("Backend not responding");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Store Rating Platform
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Sign in to continue
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "25px",
            color: "#999",
            fontSize: "14px",
          }}
        >
          Store Rating Platform © 2026
        </p>
      </div>
    </div>
  );
}