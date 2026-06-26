import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Admin Dashboard
          </h1>

          <p style={styles.subtitle}>
            Welcome back, Administrator 👋
          </p>
        </div>

        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.icon}>👥</div>

          <p style={styles.cardLabel}>
            Total Users
          </p>

          <h2 style={styles.cardValue}>
            {data.totalUsers}
          </h2>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>🏬</div>

          <p style={styles.cardLabel}>
            Total Stores
          </p>

          <h2 style={styles.cardValue}>
            {data.totalStores}
          </h2>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>⭐</div>

          <p style={styles.cardLabel}>
            Total Ratings
          </p>

          <h2 style={styles.cardValue}>
            {data.totalRatings}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.actionSection}>
        <h2 style={styles.sectionTitle}>
          Quick Actions
        </h2>

        <div style={styles.actions}>
          <button
            style={styles.actionButton}
            onClick={() => navigate("/users")}
          >
            Add User
          </button>

          <button
            style={styles.actionButton}
            onClick={() =>
              navigate("/store-management")
            }
          >
            Add Store
          </button>

          <button
            style={styles.actionButton}
            onClick={() => navigate("/users")}
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  title: {
    margin: 0,
    color: "#1f2937",
    fontSize: "36px",
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
  },

  logoutButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  icon: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  cardLabel: {
    color: "#6b7280",
    marginBottom: "10px",
    fontSize: "15px",
  },

  cardValue: {
    margin: 0,
    fontSize: "36px",
    color: "#2563eb",
  },

  actionSection: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  },

  sectionTitle: {
    marginTop: 0,
    color: "#1f2937",
  },

  actions: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  actionButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
};