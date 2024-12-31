import React from 'react';
import Layout from '@theme/Layout';

const SimpleUserPage = () => {
  return (
    <Layout title="User Dashboard">
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#2D3748' }}>User Dashboard</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Welcome! Here you can view your account details and stay updated.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {/* Account Info Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Your Account</h2>
            <ul>
              <li><b>Name:</b> John Doe</li>
              <li><b>Email:</b> johndoe@example.com</li>
              <li><b>Member Since:</b> Jan 2023</li>
            </ul>
            <a href="/user/account" style={{ color: '#3182CE', textDecoration: 'none' }}>Edit Profile →</a>
          </div>

          {/* Announcements Section */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', flex: '0 0 45%' }}>
            <h2>Announcements</h2>
            <ul>
              <li>🔔 New feature update released! Check it out.</li>
              <li>🔔 Maintenance scheduled for Jan 15, 2024.</li>
            </ul>
            <a href="/user/announcements" style={{ color: '#3182CE', textDecoration: 'none' }}>View All Announcements →</a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/user/support" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            color: '#FFF',
            backgroundColor: '#4A5568',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            Contact Support
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleUserPage;
