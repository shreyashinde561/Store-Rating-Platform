import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [uRes, sRes, rRes] = await Promise.all([
        api.get("/users"),
        api.get("/stores"),
        api.get("/ratings"),
      ]);

      setUsers(uRes.data);
      setStores(sRes.data);

      setStats({
        users: uRes.data.length,
        stores: sRes.data.length,
        ratings: rRes.data.length,
      });
    } catch (err) {
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const sortedUsers = [...users].sort((a, b) =>
    sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const sortedStores = [...stores].sort((a, b) =>
    sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1>Admin Dashboard 👋</h1>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* STATS CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>👥 Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div style={styles.card}>
          <h3>🏬 Total Stores</h3>
          <p>{stats.stores}</p>
        </div>

        <div style={styles.card}>
          <h3>⭐ Total Ratings</h3>
          <p>{stats.ratings}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actions}>
        <button onClick={() => (window.location.href = "/add-user")}>
          Add User
        </button>

        <button onClick={() => (window.location.href = "/add-store")}>
          Add Store
        </button>

        <button onClick={fetchAll}>
          Refresh Data
        </button>

        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort Name {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {/* USERS TABLE */}
      <div style={styles.section}>
        <h2>Users</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STORES TABLE */}
      <div style={styles.section}>
        <h2>Stores</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {sortedStores.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email || "-"}</td>
                <td>{s.address}</td>
                <td>
                  {s.averageRating
                    ? Number(s.averageRating).toFixed(1)
                    : "No Ratings"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  cards: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "200px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  section: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
};