import React, { useState } from "react";
import "./ChangePassword.css"; // Import CSS for styling
import { loginAndGetToken } from "./msalConfig"; // Import MSAL configuration

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Get user token
      const token = await loginAndGetToken();

      // Call the /me/changePassword endpoint
      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="password-container">
      <h1 className="password-title">Change Password</h1>
      <form className="password-form" onSubmit={handleSubmit}>
        <div className="password-input-group">
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="password-input-group">
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="password-input-group">
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="password-submit-button">
          Change Password
        </button>
      </form>
      {message && <p className="password-message">{message}</p>}
    </div>
  );
}
