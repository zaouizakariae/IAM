  import React, { useState, useEffect } from 'react';
  import './AdminPage.css'; // Custom CSS for styling

  
  const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';
  const MANUAL_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6InRTZHJPd1RCMHdlUk9SaUVVb2lZLTR0RmZGZGFCM2U1bXlNMW1rUjhKVnciLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2NzgxNzA3LCJuYmYiOjE3MzY3ODE3MDcsImV4cCI6MTczNjc4NTYwNywiYWlvIjoiazJCZ1lIQktQYzFZOXpOWC80UEgzc2hKOFRsN0FBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJBdWRpdExvZy5SZWFkLkFsbCJdLCJzdWIiOiIzNzY5YmUzMS03ZjIxLTQ4ZjMtOTVlYi0xZWMyMDJlOTU5OWUiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiIxY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIiLCJ1dGkiOiJaeFlMa0pVV3dVdVlhNHdlRUtHakFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX2lkcmVsIjoiNyA2IiwieG1zX3RjZHQiOjE3MzI3MTE5MjUsInhtc190ZGJyIjoiRVUifQ.nD4X_zUSd62aWxfaHPPWNQPWD4yQZ0LZnwtHyN_76ptISSfPHY2v2I02pZ-6z5H3on6yyGomc4If8TChPS5Q-UnXLLIhJROIHRAuAR46PEeHSBgkDpkEvIAzVEHeKxwMi23PAY28zs3fNh_L0AhxpSNu0H8iy8RfB7pG5apt29hOBwRPfQteDb4AHgegq9r27Gf3xGKBnHpFBQBA99WijsGfHftQ3HiIaZiZRvvrS3Kcb7EiTlrWLNwElnUm8z_fuA6c7OsfsaQILKczfgjlis72A53uvvq8-_fLMNWPwSGCEYz9LFgcshgbRA9QavE1CN91y2ybRNfYzJ7vFawY_w';
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
