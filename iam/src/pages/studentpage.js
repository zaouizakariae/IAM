import React, { useState, useEffect } from 'react';
import { CosmosClient } from '@azure/cosmos';
import './StudentPage.css'; // Updated CSS for new styling

const client = new CosmosClient({
  endpoint: 'https://iam-cosmosdb.documents.azure.com:443/',
  key: 'RxCpgRdhVGKt518oUIvItz7UeksISrHmaYnfKDbs7QEwk1vm0dUh1g9RIeXM5N5t38hqR6PdPZQxACDbkOJjlA==',
});

const databaseId = 'IAMDatabase';
const containerId = 'IAMNotes';

export default function StudentPage() {
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch authenticated user details
        const userResponse = await fetch(
          'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/.auth/me'
        );
        const userData = await userResponse.json();

        // Verify if the role is 'Student'
        const roleClaim = userData.clientPrincipal.claims.find(
          (claim) => claim.typ === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        );
        const role = roleClaim ? roleClaim.val : null;

        if (role !== 'Student') {
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);

        // Get the student's ID
        const studentId = userData.clientPrincipal.userDetails.split('@')[0];

        // Query Cosmos DB
        const { resources } = await client
          .database(databaseId)
          .container(containerId)
          .items.query(`SELECT * FROM c WHERE c.id = '${studentId}'`)
          .fetchAll();

        if (resources.length > 0) {
          setNote(resources[0].note);
        } else {
          setError('No note found for this student.');
        }
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to fetch data.');
      }
    };

    fetchStudentData();
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
      <div className="student-page">
        <header className="header">
          <h1>Student Portal</h1>
          <button className="back-button" onClick={goToHomePage}>
            Go Back
          </button>
        </header>
        <div className="note-container">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <p className="note">
              Your Note: {note !== null ? `${note}/20` : 'Loading...'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
