import React, { useState, useEffect } from "react";
import "./LogsViewer.css"; // Create a CSS file for styling if needed

export default function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual Graph API endpoint and token
  const LOGS_ENDPOINT = "https://graph.microsoft.com/v1.0/auditLogs/signIns";
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjRxbGt1elhTOVY1SXdVQ1FyTVpZU1pkbHlvbmV0R29FUjgzcTFsV3lzaTgiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xY2Q1YzhhOC1hYzNkLTQ4ODItYWU3OS1lMGRjMTVlOGM1NTIvIiwiaWF0IjoxNzM2ODYzNjg1LCJuYmYiOjE3MzY4NjM2ODUsImV4cCI6MTczNjg2NzU4NSwiYWlvIjoiazJCZ1lGRG9XaUtzbVIvNXdHNkdRT2JacGJwdUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJQU0iLCJhcHBpZCI6IjlmMWMyOGVhLWI4ZDUtNDFkNS1hZWQ3LTg3ZGI0Y2NjOGM2ZiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZDVjOGE4LWFjM2QtNDg4Mi1hZTc5LWUwZGMxNWU4YzU1Mi8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjM3NjliZTMxLTdmMjEtNDhmMy05NWViLTFlYzIwMmU5NTk5ZSIsInJoIjoiMS5BVXNBcU1qVkhEMnNna2l1ZWVEY0ZlakZVZ01BQUFBQUFBQUF3QUFBQUFBQUFBQkdBUUJMQUEuIiwicm9sZXMiOlsiVXNlci5SZWFkV3JpdGUuQWxsIiwiR3JvdXAuUmVhZC5BbGwiLCJVc2VyLlJlYWQuQWxsIiwiR3JvdXBNZW1iZXIuUmVhZC5BbGwiLCJVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIiwiQXVkaXRMb2cuUmVhZC5BbGwiXSwic3ViIjoiMzc2OWJlMzEtN2YyMS00OGYzLTk1ZWItMWVjMjAyZTk1OTllIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWNkNWM4YTgtYWMzZC00ODgyLWFlNzktZTBkYzE1ZThjNTUyIiwidXRpIjoibnphN2lIcjh3RW1OSHgyNkk1UERBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc19pZHJlbCI6IjcgMTAiLCJ4bXNfdGNkdCI6MTczMjcxMTkyNSwieG1zX3RkYnIiOiJFVSJ9.nEfGnugl4t30tkRTL9AOWpXMkrpLH60tfOC9ZKs-EPB8BEblrk8ORJs8KZTbh_K_81Vo5Z1X2LpkNIQ-i-yWucMYT6In0qlqfYMHRDmrPWgM722EXsToPDA56mVj-LENNq4rbeZ62w6H0YsGD41UxASmY_arLmmEaTFdaptvOqzEBQ_fLO8FBUWmwrqv0olscnnZ67W1UfM2TODhGhu89Spo7fKIIV11Aby3ggfvF15xkOJlQrlzTr8ATYhE5ENNBDIKQLNbJvD318gHrQt0iVgr8PKRDKUasaKLr97WQO9OJuRP-BwnFNwFkFk0MbIDy2tboIyOUr8onzJD-dXqtA";
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
