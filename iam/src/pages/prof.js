import React, { useState } from 'react';
import { CosmosClient } from '@azure/cosmos';
import './ProfessorPage.css'; // Updated CSS file for new styling

const client = new CosmosClient({
  endpoint: 'https://iam-cosmosdb.documents.azure.com:443/',
  key: 'RxCpgRdhVGKt518oUIvItz7UeksISrHmaYnfKDbs7QEwk1vm0dUh1g9RIeXM5N5t38hqR6PdPZQxACDbkOJjlA==',
});

const databaseId = 'IAMDatabase';
const containerId = 'IAMNotes';

export default function ProfessorPage() {
  const [studentId, setStudentId] = useState('');
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');

  const fetchStudentNotes = async () => {
    try {
      const { resources } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(`SELECT * FROM c WHERE c.id = '${studentId}'`)
        .fetchAll();

      if (resources.length > 0) {
        setResult(`Current Note: ${resources[0].note}/20`);
      } else {
        setResult('No student found with the given ID.');
      }
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      setResult('Error fetching student data.');
    }
  };

  const updateStudentNotes = async () => {
    try {
      const { resource } = await client
        .database(databaseId)
        .container(containerId)
        .item(studentId, studentId)
        .read();

      if (!resource) {
        throw new Error('Student record not found.');
      }

      // Update the note
      resource.note = parseInt(note, 10);

      // Save the updated record
      await client
        .database(databaseId)
        .container(containerId)
        .item(studentId, studentId)
        .replace(resource);

      setResult('Note updated successfully!');
    } catch (error) {
      console.error('Error updating notes:', error.message);
      setResult(`Error updating student data: ${error.message}`);
    }
  };

  const goToHomePage = () => {
    window.location.href = 'https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/';
  };

  return (
    <div className="center-container">
    <div className="professor-page">
      <header className="header">
        <h1>Professor Portal</h1>
        <button className="back-button" onClick={goToHomePage}>
          Go Back
        </button>
      </header>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            id="studentId"
            type="text"
            placeholder="Enter student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button className="primary-button" onClick={fetchStudentNotes}>
            Fetch Notes
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="note">New Note:</label>
          <input
            id="note"
            type="number"
            placeholder="Enter new note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="primary-button" onClick={updateStudentNotes}>
            Update Notes
          </button>
        </div>
      </div>
      <div className="result-container">
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
    </div>
  );
}
