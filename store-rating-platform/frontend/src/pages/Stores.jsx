import { useEffect, useState } from "react";
import api from "../services/api";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/ratings",
        {
          rating,
          user: { id: 1 }, // TEMP (later from JWT)
          store: { id: storeId },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rating submitted!");
      fetchStores();
    } catch (err) {
      console.log(err);
      alert("Error submitting rating");
    }
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Stores</h1>

      {/* SEARCH */}
      <input
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        {filteredStores.map((store) => (
          <div
            key={store.id}
            style={{
              border: "1px solid black",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>{store.name}</h3>
            <p>{store.address}</p>

            {/* Rating buttons */}
            <div>
              <span>Rate: </span>
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => submitRating(store.id, r)}
                  style={{ marginRight: 5 }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}