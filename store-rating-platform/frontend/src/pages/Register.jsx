import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (form.name.length < 20 || form.name.length > 60) {
      alert("Name must be between 20 and 60 characters.");
      return false;
    }

    if (form.address.length > 400) {
      alert("Address cannot exceed 400 characters.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be 8–16 characters and include at least 1 uppercase letter and 1 special character."
      );
      return false;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post("/users", {
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        role: "USER",
      });

      alert("Account created successfully!");

      window.location.href = "/login";
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Create Your Account
        </h1>

        <p style={styles.subtitle}>
          Join the Store Rating Platform
        </p>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name (20–60 characters)"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <p style={styles.passwordHint}>
          Password must contain:
          <br />
          • 8–16 characters
          <br />
          • At least 1 uppercase letter
          <br />
          • At least 1 special character
        </p>

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <button
          style={styles.loginButton}
          onClick={() =>
            (window.location.href = "/")
          }
        >
          Back to Login
        </button>

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
    background:
      "linear-gradient(135deg, #2563eb, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "450px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#1f2937",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "90px",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    resize: "none",
    boxSizing: "border-box",
    fontSize: "14px",
  },

  passwordHint: {
    color: "#6b7280",
    fontSize: "12px",
    lineHeight: "18px",
    marginBottom: "20px",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "12px",
  },

  loginButton: {
    width: "100%",
    padding: "14px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  footer: {
    marginTop: "25px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "12px",
  },
};

