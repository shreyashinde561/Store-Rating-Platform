import { useEffect, useState } from "react";
import api from "../services/api";

export default function OwnerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        `/admin/store-owner/${user.id}`
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!data) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingCard}>
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Store Owner Dashboard
          </h1>

          <p style={styles.subtitle}>
            Welcome, {user?.name} 👋
          </p>
        </div>

        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Average Rating Card */}
      <div style={styles.analyticsCard}>
        <p style={styles.cardLabel}>
          Average Store Rating
        </p>

        <h2 style={styles.ratingValue}>
          ⭐ {Number(data.averageRating || 0).toFixed(1)}
        </h2>

        <p style={styles.cardInfo}>
          Based on customer ratings
        </p>
      </div>

      {/* Users Table */}
      <div style={styles.tableCard}>
        <h2 style={styles.sectionTitle}>
          Users Who Rated Your Store
        </h2>

        {data.ratings.length === 0 ? (
          <div style={styles.emptyState}>
            No ratings received yet.
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  User Name
                </th>

                <th style={styles.th}>
                  Rating
                </th>
              </tr>
            </thead>

            <tbody>
              {data.ratings.map((rating, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {rating.user}
                  </td>

                  <td style={styles.td}>
                    ⭐ {rating.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },

  loadingCard: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    color: "#1f2937",
  },

  subtitle: {
    marginTop: "5px",
    color: "#6b7280",
  },

  logoutButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  analyticsCard: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    textAlign: "center",
  },

  cardLabel: {
    color: "#6b7280",
    fontSize: "16px",
    marginBottom: "10px",
  },

  ratingValue: {
    fontSize: "48px",
    margin: 0,
    color: "#2563eb",
  },

  cardInfo: {
    marginTop: "10px",
    color: "#9ca3af",
  },

  tableCard: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  sectionTitle: {
    marginBottom: "20px",
    color: "#1f2937",
  },

  emptyState: {
    textAlign: "center",
    color: "#6b7280",
    padding: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "15px",
    background: "#f9fafb",
    borderBottom: "2px solid #e5e7eb",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #e5e7eb",
  },
};