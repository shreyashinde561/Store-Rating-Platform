import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

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

  const submitRating = async (storeId) => {
    const rating = ratings[storeId];

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      await api.post("/ratings", {
        rating: Number(rating),
        user: {
          id: user.id,
        },
        store: {
          id: storeId,
        },
      });

      alert("Rating Submitted Successfully ⭐");
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Failed to submit rating");
      }
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Store Rating Platform</h1>

          <p style={styles.welcome}>
            Welcome, {user?.name} 👋
          </p>
        </div>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search stores by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* Store Cards */}
      {filteredStores.length === 0 ? (
        <div style={styles.empty}>
          No stores found.
        </div>
      ) : (
        filteredStores.map((store) => (
          <div key={store.id} style={styles.card}>
            <h2>{store.name}</h2>

            <p>
              📍 <strong>Address:</strong> {store.address}
            </p>

            <p>{store.description}</p>

            <p>
              ⭐ <strong>Overall Rating:</strong>{" "}
              {store.averageRating || "Not Rated"}
            </p>

            <div style={styles.ratingSection}>
              <select
                value={ratings[store.id] || ""}
                onChange={(e) =>
                  setRatings({
                    ...ratings,
                    [store.id]: e.target.value,
                  })
                }
                style={styles.select}
              >
                <option value="">
                  Rate Store
                </option>

                <option value="1">
                  ⭐ 1
                </option>

                <option value="2">
                  ⭐⭐ 2
                </option>

                <option value="3">
                  ⭐⭐⭐ 3
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ 4
                </option>

                <option value="5">
                  ⭐⭐⭐⭐⭐ 5
                </option>
              </select>

              <button
                style={styles.submit}
                onClick={() => submitRating(store.id)}
              >
                Submit Rating
              </button>
            </div>
          </div>
        ))
      )}
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  heading: {
    margin: 0,
    color: "#1f2937",
  },

  welcome: {
    color: "#6b7280",
    marginTop: "5px",
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  search: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "30px",
    fontSize: "14px",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  ratingSection: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    minWidth: "140px",
  },

  submit: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  empty: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#6b7280",
  },
};