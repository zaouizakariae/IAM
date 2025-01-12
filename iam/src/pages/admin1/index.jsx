import React from 'react';
import Layout from '@theme/Layout';

const SysAdminPage = () => {
  return (
    <Layout title="SysAdmin Dashboard">
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#2D3748' }}>System Administrator Dashboard</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Welcome to the admin panel. Manage system-wide settings and monitor access.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {/* System Overview Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>System Overview</h2>
            <ul>
              <li>Total Users: <b>150</b></li>
              <li>Active Sessions: <b>23</b></li>
              <li>Pending Approvals: <b>5</b></li>
            </ul>
          </div>

          {/* Logs Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Recent Activity Logs</h2>
            <ul>
              <li>User <b>JohnDoe</b> accessed the dashboard at 12:34 PM.</li>
              <li>User <b>Admin123</b> updated permissions at 11:20 AM.</li>
              <li>System reboot completed at 10:15 AM.</li>
            </ul>
            <a href="/admin/logs" style={{ color: '#3182CE', textDecoration: 'none' }}>View All Logs →</a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/admin/settings" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            color: '#FFF',
            backgroundColor: '#3182CE',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            Go to System Settings
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SysAdminPage;
