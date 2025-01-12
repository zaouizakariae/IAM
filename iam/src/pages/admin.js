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

  const handleDeleteUser = async (userId) => {
    const token = await getAccessToken();
    try {
      const response = await fetch(`${GRAPH_API_ENDPOINT}/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting user:', errorData);
        alert(`Failed to delete user: ${errorData.error.message}`);
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user.');
    }
  };

  const handleAddUser = async () => {
    const email = prompt('Enter the email for the new user:');
    const displayName = prompt('Enter the display name for the new user:');
    const token = await getAccessToken();

    if (!email || !displayName) {
      alert('Both email and display name are required.');
      return;
    }

    try {
      const response = await fetch(GRAPH_API_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountEnabled: true,
          displayName,
          mailNickname: displayName.split(' ').join('').toLowerCase(),
          userPrincipalName: email,
          passwordProfile: {
            forceChangePasswordNextSignIn: true,
            password: 'TemporaryPassword123!',
          },
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prev) => [...prev, newUser]);
        alert('User added successfully!');
      } else {
        throw new Error('Failed to add user');
      }
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user.');
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
          <div className="action-buttons">
            <button className="back-button" onClick={goToHomePage}>
              Go Back
            </button>
            <button className="add-button" onClick={handleAddUser}>
              Add User
            </button>
          </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.displayName}</td>
                    <td>{user.userPrincipalName}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
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
