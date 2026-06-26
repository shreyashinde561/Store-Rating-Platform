import { useEffect, useState } from "react";
import api from "../services/api";

export default function StoreManagement() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load stores");
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    if (form.name.length < 3) {
      alert("Store name too short");
      return false;
    }

    if (form.address.length > 400) {
      alert("Address max 400 characters allowed");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      alert("Invalid email");
      return false;
    }

    return true;
  };

  // ---------------- ADD STORE ----------------
  const addStore = async () => {
    if (!validate()) return;

    try {
      await api.post("/stores", form);

      alert("Store Added Successfully");

      setForm({
        name: "",
        email: "",
        address: "",
        description: "",
      });

      fetchStores();
    } catch (err) {
      console.log(err);
      alert("Failed to add store");
    }
  };

  // ---------------- SEARCH ----------------
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- SORT ----------------
  const sortData = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredStores].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setStores(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div style={styles.container}>
      <h1>Store Management</h1>

      {/* ---------------- ADD STORE ---------------- */}
      <div style={styles.card}>
        <h2>Add New Store</h2>

        <input
          style={styles.input}
          placeholder="Store Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Store Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button style={styles.button} onClick={addStore}>
          Add Store
        </button>
      </div>

      {/* ---------------- SEARCH ---------------- */}
      <div style={styles.card}>
        <h2>All Stores</h2>

        <input
          style={styles.input}
          placeholder="Search by Name or Address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ---------------- TABLE ---------------- */}
        <table style={styles.table} border="1" cellPadding="10">
          <thead>
            <tr>
              <th onClick={() => sortData("name")} style={{ cursor: "pointer" }}>
                Name ↕
              </th>

              <th onClick={() => sortData("email")} style={{ cursor: "pointer" }}>
                Email ↕
              </th>

              <th>Address</th>

              <th onClick={() => sortData("averageRating")} style={{ cursor: "pointer" }}>
                Rating ↕
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.email || "-"}</td>
                <td>{store.address}</td>
                <td>{store.averageRating || "0"}</td>
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
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
};