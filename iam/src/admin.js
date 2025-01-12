import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Custom CSS for styling

const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch authenticated user details
        const userResponse = await fetch(
          'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/.auth/me'
        );
        const userData = await userResponse.json();

        // Verify if the role is 'Admin'
        const roleClaim = userData.clientPrincipal.claims.find(
          (claim) => claim.typ === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        );
        const role = roleClaim ? roleClaim.val : null;

        if (role !== 'Admin') {
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);

        // Fetch users from Azure AD using Microsoft Graph API
        const graphResponse = await fetch(GRAPH_API_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GRAPH_API_TOKEN}`,
          },
        });

        if (!graphResponse.ok) {
          throw new Error('Failed to fetch users from Azure AD');
        }

        const graphData = await graphResponse.json();
        setUsers(graphData.value);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch data.');
      }
    };

    fetchAdminData();
  }, []);

  const goToHomePage = () => {
    window.location.href = 'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/';
  };

  if (!isAuthorized) {
    return (
      <div className="center-container">
        <div className="unauthorized">
          <h1>Access Denied</h1>
          <p>You do not have permission to access this page.</p>
          <button className="back-button" onClick={goToHomePage}>
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-container">
      <div className="admin-page">
        <header className="header">
          <h1>Admin Portal</h1>
          <button className="back-button" onClick={goToHomePage}>
            Go Back
          </button>
        </header>
        <div className="user-list">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Display Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.displayName}</td>
                    <td>{user.userPrincipalName}</td>
                    <td>
                      {user.jobTitle || 'Unknown'} {/* Replace this with role logic */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
