import React, { useState } from "react";
import "./ChangePassword.css"; // CSS for styling

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // User token (for testing purposes only)
  const USER_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6InN1cXJlUWgtY053S3pRWm9qZm05cmk5VnBZajJJS0JFanRrZHpuWnlmbGciLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2Nzg4NzMxLCJuYmYiOjE3MzY3ODg3MzEsImV4cCI6MTczNjc5NDIxNywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6ImsyQmdZTkJkbGFTamJYNys3Y2xuUzd1OTFBemFEQU0rNnNoK0ttK3JjSTNYbldraEdQWm1QNCsrNk8yTHZJbXk4aGFPVTRwc0FRPT0iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IklBTSIsImFwcGlkIjoiOWYxYzI4ZWEtYjhkNS00MWQ1LWFlZDctODdkYjRjY2M4YzZmIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE0Ny45NC4xMzUuMzAiLCJuYW1lIjoiYWRtaW4gb25lIiwib2lkIjoiMTZjOTAwMmYtY2Y4My00ZTkxLThmNDItMjAwM2VhMzkyMGRiIiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzMjAwNDBDQUI1NDE4IiwicmgiOiIxLkFVc0FxTWpWSEQyc2draXVlZURjRmVqRlVnTUFBQUFBQUFBQXdBQUFBQUFBQUFCR0FTNUxBQS4iLCJzY3AiOiJBdWRpdExvZy5SZWFkLkFsbCBlbWFpbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgVXNlci5SZWFkV3JpdGUuQWxsIiwic3ViIjoiaXFLdGpjaGFvekRhNVdYRXBMVDl5Tm9vU0xGdDlURnBoRXdEMWQ5M1BqQSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1MiIsInVuaXF1ZV9uYW1lIjoiYWRtaW4xQGlhbXByb2plY3QxLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImFkbWluMUBpYW1wcm9qZWN0MS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJCM1ZFdnFmdHFFQzFYbTg3R3FJVEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAzMCIsInhtc19zdCI6eyJzdWIiOiJIX0NyUmx3ZnQ0NkVFTWZwZHl3YktfQWpVVVo5NFB1QkIxZk9HUXQwSHh3In0sInhtc190Y2R0IjoxNzMyNzExOTI1LCJ4bXNfdGRiciI6IkVVIn0.mCSfsSdyI9INpLLZ08tJWEv9C4P4hHdWosgahbjZUHMveMHZ_5c-r2umasr49T1tkhmqTqDdxEFd2p8v9hHdDW-ZytyESNbwg-JuE3-jrGjolrJV_3_A_LvixM_J74NdqeTTT1yjIUqSFRmJs9f0_vHG8RtOMpS8vRVthQ2uCvFDD6W44_BQJcvqKNmts2sUrXO0J1MSGe6_uWGwIdM7oa4rwUK0VsBhvzrJdsaUdtJ9Pq5dck-CGLno2u1JN0msfv8GJ88TKXf4kG0-yOoP-amOItNTLcLncnL-9p9srzrAFW8oW_uPeArAIKl9i5AgunzVlcbbJw9mdVsdTfqD8g";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${USER_TOKEN}`,
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
