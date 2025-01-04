import React from 'react';
import Layout from '@theme/Layout';

const ManagerPage = () => {
  return (
    <Layout title="Manager Dashboard">
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#2D3748' }}>Manager Dashboard</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Welcome, Manager. Oversee your team and track performance here.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {/* Team Overview Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Team Overview</h2>
            <ul>
              <li>Total Team Members: <b>8</b></li>
              <li>Active Tasks: <b>12</b></li>
              <li>Pending Approvals: <b>3</b></li>
            </ul>
            <a href="/manager/team" style={{ color: '#3182CE', textDecoration: 'none' }}>Manage Team →</a>
          </div>

          {/* Performance Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Performance Metrics</h2>
            <ul>
              <li>Tasks Completed This Week: <b>18</b></li>
              <li>Average Completion Time: <b>3.4 hours</b></li>
              <li>Outstanding Issues: <b>5</b></li>
            </ul>
            <a href="/manager/performance" style={{ color: '#3182CE', textDecoration: 'none' }}>View Full Report →</a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/manager/tasks" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            color: '#FFF',
            backgroundColor: '#38A169',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            Manage Tasks
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerPage;
