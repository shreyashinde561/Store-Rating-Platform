
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortOrder === "ASC") {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading users...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            User Management
          </h1>

          <p style={styles.subtitle}>
            Manage platform users
          </p>
        </div>

        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div style={styles.filters}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          style={styles.select}
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
        >
          <option value="ALL">
            All Roles
          </option>

          <option value="ADMIN">
            Admin
          </option>

          <option value="USER">
            User
          </option>

          <option value="STORE_OWNER">
            Store Owner
          </option>
        </select>

        <select
          style={styles.select}
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
        >
          <option value="ASC">
            Name ↑
          </option>

          <option value="DESC">
            Name ↓
          </option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                Name
              </th>

              <th style={styles.th}>
                Email
              </th>

              <th style={styles.th}>
                Address
              </th>

              <th style={styles.th}>
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={styles.empty}
                >
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    {user.name}
                  </td>

                  <td style={styles.td}>
                    {user.email}
                  </td>

                  <td style={styles.td}>
                    {user.address}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          user.role === "ADMIN"
                            ? "#fee2e2"
                            : user.role === "STORE_OWNER"
                            ? "#dbeafe"
                            : "#dcfce7",
                        color:
                          user.role === "ADMIN"
                            ? "#b91c1c"
                            : user.role === "STORE_OWNER"
                            ? "#1d4ed8"
                            : "#15803d",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "#f3f4f6",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "5px",
  },

  logoutButton: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  filters: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    minWidth: "250px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
  },

  tableContainer: {
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#2563eb",
    color: "#fff",
    padding: "15px",
    textAlign: "left",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #e5e7eb",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#6b7280",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
};
