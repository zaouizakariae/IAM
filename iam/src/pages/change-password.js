import React, { useState } from "react";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlV4SWRfYUZFakRHQ1hFYTlwSE9JTFVVMFdZYkRZTV9PNkRDbDVTdUFlT3MiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2NzkwODE2LCJuYmYiOjE3MzY3OTA4MTYsImV4cCI6MTczNjc5NDcxNiwiYWlvIjoiazJCZ1lKZ3Z2ajdCeVAzQm5zL3JDNnVubUNmTkFRQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIiwiQXVkaXRMb2cuUmVhZC5BbGwiXSwic3ViIjoiMzc2OWJlMzEtN2YyMS00OGYzLTk1ZWItMWVjMjAyZTk1OTllIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidXRpIjoiTHQ3dWlDb2JmME82TlhKZDA0YXVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMzAiLCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.H4uTYTJfBKG1xEkWOEeLpgMsZx7LUpX_LwzdxN6pehlA0StU1iaW7E5EZIfYRF7Qc9-KlHzx7_40vojrKbZrgQypUjavh6ijXQAgFA9eMg9dkIYqFKUiFuozWAL_yZGZiysrUiDxJGGIDlzdoLLovbwri-5ObHiMZFJ-0GNpqkRNyN1_xAnc0tzeDoq9qXMHZyHvNEiy56RhooTEEc3hEQd7-G2n-4mX0z_jAUOsBOaWuTMPsYR2qq0f_fcnyPTEwKgY2uBqWuVCr9QTTdWneunm97GsPy2NRVk_3NHReTELPUNBJxidffQlWevf61EVqwABjJafS5exrSlGA7APwg";
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
