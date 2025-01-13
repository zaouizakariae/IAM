import React, { useState } from "react";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImNzM2dfMHNkS3kwX2tWVlpPa2hjLVBFcHFQN3lnajhiRF9iMVZMOVdQNVUiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2NzkwNDY1LCJuYmYiOjE3MzY3OTA0NjUsImV4cCI6MTczNjc5NDk3MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhZQUFBQXU5NU5KWDJsYXRPc3hNNlN1Y3pWUUpScnhrSGZTYXM1MWlLL3pXWGZyRUNFMC9SSTBCMEV5ZVRLUUhLUUNGaDAiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IklBTSIsImFwcGlkIjoiOWYxYzI4ZWEtYjhkNS00MWQ1LWFlZDctODdkYjRjY2M4YzZmIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE0Ny45NC4xMzUuMzAiLCJuYW1lIjoiYWRtaW4gb25lIiwib2lkIjoiMTZjOTAwMmYtY2Y4My00ZTkxLThmNDItMjAwM2VhMzkyMGRiIiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzMjAwNDBDQUI1NDE4IiwicmgiOiIxLkFVc0FxTWpWSEQyc2draXVlZURjRmVqRlVnTUFBQUFBQUFBQXdBQUFBQUFBQUFCR0FTNUxBQS4iLCJzY3AiOiJBdWRpdExvZy5SZWFkLkFsbCBlbWFpbCBvcGVuaWQgcHJvZmlsZSBVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJpcUt0amNoYW96RGE1V1hFcExUOXlOb29TTEZ0OVRGcGhFd0QxZDkzUGpBIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidW5pcXVlX25hbWUiOiJhZG1pbjFAaWFtcHJvamVjdDEub25taWNyb3NvZnQuY29tIiwidXBuIjoiYWRtaW4xQGlhbXByb2plY3QxLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Ii1CTkJMcGlWVVU2TEpyWjJlNkNoQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDIiLCJ4bXNfc3QiOnsic3ViIjoiSF9DclJsd2Z0NDZFRU1mcGR5d2JLX0FqVVVaOTRQdUJCMWZPR1F0MEh4dyJ9LCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.iOSFtCg4zH7Nvf13rhK1p8Jb-9A_T0OtGMDzQsIQIJXicXm9BHdgZtTS8vuvT4uLo4sUWC_KgSZ2XNoqTXzrCQjndjKEzxskDfMs-O_u7l_40JP7MbR3Lq0okhSYbjBCfusRntQ9YN1KB7wNa-9QTC3CjXuXU0c7ZSHhd8l7OaLICWa-u-6fRvP9iXeqTBUuP5fbZ9gzgTwJlNFtDgWWpuIT0f6fshilWqQBGX07TYxybE7kJNNBzIiLp6NoTiCLZ6_x5e9XAMXNBhtBlZ6Jh5MCfhE94hStMhqn3pCLdEjWiN1fg8RLvVXl67F2wWGzqNIdskK6Pffq_ufgfeQjog"; // Replace with a valid token

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
            Authorization: `Bearer ${ACCESS_TOKEN}`,
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
