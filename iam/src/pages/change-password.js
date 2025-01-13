
  import React, { useState } from 'react';
  import './ChangePassword.css'; // Custom CSS for styling the red theme
  
  export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const AZURE_AD_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/changePassword'; // Azure Graph API endpoint for password change
    const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6InRTZHJPd1RCMHdlUk9SaUVVb2lZLTR0RmZGZGFCM2U1bXlNMW1rUjhKVnciLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2NzgxNzA3LCJuYmYiOjE3MzY3ODE3MDcsImV4cCI6MTczNjc4NTYwNywiYWlvIjoiazJCZ1lIQktQYzFZOXpOWC80UEgzc2hKOFRsN0FBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJBdWRpdExvZy5SZWFkLkFsbCJdLCJzdWIiOiIzNzY5YmUzMS03ZjIxLTQ4ZjMtOTVlYi0xZWMyMDJlOTU5OWUiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiIxY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIiLCJ1dGkiOiJaeFlMa0pVV3dVdVlhNHdlRUtHakFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX2lkcmVsIjoiNyA2IiwieG1zX3RjZHQiOjE3MzI3MTE5MjUsInhtc190ZGJyIjoiRVUifQ.nD4X_zUSd62aWxfaHPPWNQPWD4yQZ0LZnwtHyN_76ptISSfPHY2v2I02pZ-6z5H3on6yyGomc4If8TChPS5Q-UnXLLIhJROIHRAuAR46PEeHSBgkDpkEvIAzVEHeKxwMi23PAY28zs3fNh_L0AhxpSNu0H8iy8RfB7pG5apt29hOBwRPfQteDb4AHgegq9r27Gf3xGKBnHpFBQBA99WijsGfHftQ3HiIaZiZRvvrS3Kcb7EiTlrWLNwElnUm8z_fuA6c7OsfsaQILKczfgjlis72A53uvvq8-_fLMNWPwSGCEYz9LFgcshgbRA9QavE1CN91y2ybRNfYzJ7vFawY_w'; // Replace with a valid token for testing
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match!');
        return;
      }
  
      try {
        const response = await fetch(AZURE_AD_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });
  
        if (response.ok) {
          setMessage('Password changed successfully!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          const errorData = await response.json();
          setMessage(errorData.error.message || 'Failed to change password.');
        }
      } catch (err) {
        console.error('Error changing password:', err);
        setMessage('An error occurred. Please try again later.');
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