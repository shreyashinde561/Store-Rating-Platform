import { useState } from "react";
import api from "../services/api";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 8–16 characters with 1 uppercase letter and 1 special character"
      );
      return;
    }

    try {
      await api.patch(
        `/users/${user.id}/password`,
        {
          password,
        }
      );

      alert("Password Updated Successfully");

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      alert("Failed to update password");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Change Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          padding: "12px",
          width: "300px",
          marginBottom: "15px",
          display: "block",
        }}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        style={{
          padding: "12px",
          width: "300px",
          marginBottom: "15px",
          display: "block",
        }}
      />

      <button
        onClick={handleChangePassword}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Update Password
      </button>
    </div>
  );
}