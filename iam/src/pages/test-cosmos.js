import React, { useState } from 'react';

export default function TestCosmos() {
  const [studentId, setStudentId] = useState('');
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');

  const fetchStudentNotes = async () => {
    try {
      const response = await fetch('https://<YOUR-COSMOS-DB-URL>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.COSMOS_CONNECTION_STRING,
        },
        body: JSON.stringify({
          query: `SELECT * FROM c WHERE c.id = '${studentId}'`,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const updateStudentNotes = async () => {
    try {
      const response = await fetch('https://<YOUR-COSMOS-DB-URL>', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.COSMOS_CONNECTION_STRING,
        },
        body: JSON.stringify({
          id: studentId,
          note: note,
        }),
      });

      if (response.ok) {
        setResult('Note updated successfully!');
      } else {
        setResult('Failed to update note.');
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  return (
    <div>
      <h1>Test Cosmos DB</h1>
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
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button onClick={updateStudentNotes}>Update Notes</button>
      </div>
      <div>
        <h2>Result:</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
    