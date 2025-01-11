import React, { useState } from 'react';
import { CosmosClient } from '@azure/cosmos';

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
      console.error('Error fetching notes:', error);
      setResult('Error fetching student data.');
    }
  };

  const updateStudentNotes = async () => {
    try {
      const { resource: studentRecord } = await client
        .database(databaseId)
        .container(containerId)
        .item(studentId)
        .read();

      studentRecord.note = parseInt(note, 10);

      await client.database(databaseId).container(containerId).item(studentId).replace(studentRecord);

      setResult('Note updated successfully!');
    } catch (error) {
      console.error('Error updating notes:', error);
      setResult('Error updating student data.');
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
