  import React, { useState, useEffect } from 'react';
  import './AdminPage.css'; // Custom CSS for styling

  const GRAPH_API_SIGNIN_LOGS_ENDPOINT = 'https://graph.microsoft.com/v1.0/auditLogs/signIns';
  const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';
  const MANUAL_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik5EQW1JTWhiTGlMRTNEXzllUFFtdC1XQ0dKUkxMTVlJYkh2YUgtX29vSVUiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2NzIzMTY3LCJuYmYiOjE3MzY3MjMxNjcsImV4cCI6MTczNjcyNzA2NywiYWlvIjoiazJCZ1lDZ09xcEY2eWJ2YmJjdFdPMldHZHVFZ0FBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiXSwic3ViIjoiMzc2OWJlMzEtN2YyMS00OGYzLTk1ZWItMWVjMjAyZTk1OTllIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidXRpIjoiYUZRWVNNVFRvVTY0Z2NEci00LVBBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjI0IDciLCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.DowjZf1uX71hk--9zPJj4BKz0NdvxzZ-gmQAZxxw38LGYDFXc8une3KZb0epyPJXBHLjpq-uz0WUR-8-JmVreC5XYOFXBS-hZANh5Q32fTdYLTY5K8uopFWH50r8ci8wcF57HIFStqsjBlfEeCRBjW8thBJqHaxdUm--CBZ64svt5mnxsfDdQPNbTDBa6AKFUO2KnfJ0_Ir95PbRx0MkSgOei_k7l0X5G_3rFzZvz9i3outLy0Esli3wdEZ2qj2iNJ6vktQXcJ9l2RVhO-7wQzFvUB-9eo6DtGEtBW2wL2YNg9F3NGjLCIoNVS6LDDL3sei9yd9qBVTxEiqZplif_g'; // Place your manually generated token here

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
