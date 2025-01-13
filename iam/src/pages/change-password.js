import React, { useState, useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import "./ChangePassword.css"; // Custom CSS for styling the red theme

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "9f1c28ea-b8d5-41d5-aed7-87db4ccc8c6f", // Replace with your Azure AD app's client ID
    authority: "https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552", // Replace with your Azure AD tenant ID
    redirectUri: "https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/", // Replace with your app's redirect URI
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// ChangePassword Component
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Ensure MSAL instance is initialized
  useEffect(() => {
    msalInstance.initialize(); // Initializes the instance
  }, []);

  const loginAndGetToken = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["User.ReadWrite"], // Request delegated permissions
      });
      return loginResponse.accessToken;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

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
