import React from 'react';
import Layout from '@theme/Layout';

const TeamMemberPage = () => {
  return (
    <Layout title="Team Member Dashboard">
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#2D3748' }}>Team Member Dashboard</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Welcome to your workspace. Track your tasks and deadlines here.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {/* Assigned Tasks Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Your Tasks</h2>
            <ul>
              <li><b>Complete Onboarding Guide</b> - Due: <i>2024-01-03</i></li>
              <li><b>Submit Code Review</b> - Due: <i>2024-01-05</i></li>
              <li><b>Team Meeting Prep</b> - Due: <i>2024-01-07</i></li>
            </ul>
            <a href="/team/tasks" style={{ color: '#3182CE', textDecoration: 'none' }}>View All Tasks →</a>
          </div>

          {/* Progress Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Progress Overview</h2>
            <ul>
              <li>Tasks Completed This Week: <b>3</b></li>
              <li>Upcoming Deadlines: <b>2</b></li>
              <li>Issues Reported: <b>1</b></li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/team/support" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            color: '#FFF',
            backgroundColor: '#E53E3E',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            Request Support
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMemberPage;
