import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Custom CSS for styling

const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  let accessToken = null;
  let tokenExpiry = null;

  const getAccessToken = async () => {
    if (!accessToken || Date.now() >= tokenExpiry) {
      const response = await fetch(
        'https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552/oauth2/v2.0/token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: '9f1c28ea-b8d5-41d5-aed7-87db4ccc8c6f',
            client_secret: 'etG8Q~EPj9LSkZPPRzvdVqx5q6oXj9InNtPutbcC',
            scope: 'https://graph.microsoft.com/.default',
            grant_type: 'client_credentials',
          }),
        }
      );

      const data = await response.json();
      accessToken = data.access_token;
      tokenExpiry = Date.now() + data.expires_in * 1000;
    }
    return accessToken;
  };

  const fetchAdminData = async () => {
    const token = await getAccessToken();
    try {
      const userResponse = await fetch(
        'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/.auth/me'
      );
      const userData = await userResponse.json();

      const roleClaim = userData.clientPrincipal.claims.find(
        (claim) => claim.typ === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      );
      const role = roleClaim ? roleClaim.val : null;
      console.log('Role:', role);

      if (role !== 'Admin') {
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);

      const graphResponse = await fetch(GRAPH_API_ENDPOINT, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
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

  const goToHomePage = () => {
    window.location.href = 'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/';
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

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
        <div className="user-list scrollable">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Display Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.displayName}</td>
                    <td>{user.userPrincipalName}</td>
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
