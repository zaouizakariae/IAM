  import React, { useState, useEffect } from 'react';
  import './AdminPage.css'; // Custom CSS for styling

  
  const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';
  const MANUAL_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkxKRkRDZzMtQ3gyWnBzNjA4TnhndFBGcnhVaEEwUHl6Sno4LWhxN0h4ZG8iLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2ODU5NDMzLCJuYmYiOjE3MzY4NTk0MzMsImV4cCI6MTczNjg2MzMzMywiYWlvIjoiazJSZ1lGRGNvM285UG9ualdvNStoN1hRWkMwOUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIiwiQXVkaXRMb2cuUmVhZC5BbGwiXSwic3ViIjoiMzc2OWJlMzEtN2YyMS00OGYzLTk1ZWItMWVjMjAyZTk1OTllIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidXRpIjoiVTdDaDZkYmVMMEd5T1BuWGp0c2NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMTIiLCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.O7RiIaVZQq30CiuBmCwdrUV9f6tizFi-QMR7KOZvQmIwl5uQwxtDdaP63iZYJLW3TVHwpukmvFH8oYQC5Y7ivBKZla_KNvhaBOz6UQZ2xMtH1sQUFEnzsGjygdph5M4hGUq-HY_XeCTWQPo2Kd0SdT6YNIA5mI4WhnHNJD0Qxip8hnVbIhfxuhJfJkBQvuQWMlRfVnKLO5hXYndHXit1DTT-_OB9hUuW74TcqMaek8R3MqUhVIMeW1XoBj53KXGOVIOlDXt5ueVsvZmL0phE20wbCAAboM4feWxTG2N85mETJk1WQ0j5GbyPWmO7_Ns9BoZT4odyszOHqHw8bAjfRw';
  export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);


    
    const fetchAdminData = async () => {
      try {
        // Fetch the current user's authentication and role
        const userResponse = await fetch(
          'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/.auth/me'
        );
        const userData = await userResponse.json();

        const roleClaim = userData.clientPrincipal.claims.find(
          (claim) => claim.typ === 'roles'
        );
        const role = roleClaim ? roleClaim.val : null;
        console.log('Role:', role);

        if (role !== 'Admin') {
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);

        // Fetch user data from Microsoft Graph
        const graphResponse = await fetch(GRAPH_API_ENDPOINT, {
          method: 'GET',
          headers: { Authorization: `Bearer ${MANUAL_ACCESS_TOKEN}` },
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
      try {
        const deleteResponse = await fetch(`${GRAPH_API_ENDPOINT}/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${MANUAL_ACCESS_TOKEN}`,
          },
        });

        if (!deleteResponse.ok) {
          const errorData = await deleteResponse.json();
          console.error('Error deleting user:', errorData);
          alert(`Failed to delete user: ${errorData.error.message}`);
          return;
        }

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert('User deleted successfully!');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user.');
      }
    };

    const handleAddUser = async () => {
      const email = prompt('Enter the email for the new user:');
      const displayName = prompt('Enter the display name for the new user:');

      if (!email || !displayName) {
        alert('Both email and display name are required.');
        return;
      }

      try {
        const addResponse = await fetch(GRAPH_API_ENDPOINT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${MANUAL_ACCESS_TOKEN}`,
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

        if (addResponse.ok) {
          const newUser = await addResponse.json();
          setUsers((prevUsers) => [...prevUsers, newUser]);
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
