import React, { useState, useEffect } from "react";
import "./LogsViewer.css"; // Create a CSS file for styling if needed

export default function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual Graph API endpoint and token
  const LOGS_ENDPOINT = "https://graph.microsoft.com/v1.0/auditLogs/signIns";
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkxKRkRDZzMtQ3gyWnBzNjA4TnhndFBGcnhVaEEwUHl6Sno4LWhxN0h4ZG8iLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2ODU5NDMzLCJuYmYiOjE3MzY4NTk0MzMsImV4cCI6MTczNjg2MzMzMywiYWlvIjoiazJSZ1lGRGNvM285UG9ualdvNStoN1hRWkMwOUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIiwiQXVkaXRMb2cuUmVhZC5BbGwiXSwic3ViIjoiMzc2OWJlMzEtN2YyMS00OGYzLTk1ZWItMWVjMjAyZTk1OTllIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidXRpIjoiVTdDaDZkYmVMMEd5T1BuWGp0c2NBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMTIiLCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.O7RiIaVZQq30CiuBmCwdrUV9f6tizFi-QMR7KOZvQmIwl5uQwxtDdaP63iZYJLW3TVHwpukmvFH8oYQC5Y7ivBKZla_KNvhaBOz6UQZ2xMtH1sQUFEnzsGjygdph5M4hGUq-HY_XeCTWQPo2Kd0SdT6YNIA5mI4WhnHNJD0Qxip8hnVbIhfxuhJfJkBQvuQWMlRfVnKLO5hXYndHXit1DTT-_OB9hUuW74TcqMaek8R3MqUhVIMeW1XoBj53KXGOVIOlDXt5ueVsvZmL0phE20wbCAAboM4feWxTG2N85mETJk1WQ0j5GbyPWmO7_Ns9BoZT4odyszOHqHw8bAjfRw"; // Replace this with the real token

  // Fetch logs from the Graph API
  const fetchLogs = async () => {
    try {
      const response = await fetch(LOGS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching logs: ${response.statusText}`);
      }

      const data = await response.json();
      setLogs(data.value);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch logs on component mount
  useEffect(() => {
    fetchLogs();
  }, []);

  // Render loading, error, or logs table
  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="logs-container">
      <h2 className="logs-title">Sign-In Logs</h2>
      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Application</th>
              <th>Status</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.createdDateTime).toLocaleString()}</td>
                <td>{log.userPrincipalName}</td>
                <td>{log.appDisplayName}</td>
                <td>{log.status?.failureReason || "Success"}</td>
                <td>{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
