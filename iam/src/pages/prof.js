import React, { useState } from 'react';
import { CosmosClient } from '@azure/cosmos';

// Cosmos DB configuration
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
        .item(studentId)
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
        .item(studentId)
        .replace(resource);

      setResult('Note updated successfully!');
    } catch (error) {
      console.error('Error updating notes:', error.message);
      setResult(`Error updating student data: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Professor Portal</h1>
      <div>
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <button onClick={fetchStudentNotes}>Fetch Notes</button>
      </div>
      <div>
        <label>
          New Note:
          <input
            type="number"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button onClick={updateStudentNotes}>Update Notes</button>
      </div>
      <div>
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}
