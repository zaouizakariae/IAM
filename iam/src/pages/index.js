import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// Group mapping (Group IDs from Azure AD to readable names)
const groupsMap = {
  "96a55f06-44bd-42ac-9b13-1b9b44071093": "Administrator",
  "e21d94c3-d9d5-414b-865b-79989deb4849": "Direction",
  "49c5b0ba-1da4-4afb-b124-632a4b9f4722": "External Professors",
  "34828a01-3530-4e24-9586-660d9979c968": "Human Resources",
  "c09d0aad-1670-4ff9-b6c6-7b8ad949ca9": "Maintenance",
  "5871d88a-63b5-499f-b4ef-5a730c8d7136": "Professors",
  "942df11e-7c4e-4344-a75a-7c21c5b568e8": "Scolarité",
  "88439227-1256-4a2e-b9ce-7ad68208ebc0": "Students",
};

async function fetchUserInfo() {
  try {
    const response = await fetch('/.auth/me');
    const data = await response.json();
    const groupClaims = data?.clientPrincipal?.claims?.filter(claim => claim.typ === 'groups').map(claim => claim.val);
    return groupClaims || [];
  } catch (error) {
    console.error('Error fetching user info:', error);
    return [];
  }
}

function HomepageHeader({ userGroup }) {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">University</Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/* Conditionally render buttons based on userGroup */}
          {userGroup === "Administrator" && (
            <Link
              className="button button--secondary button--lg"
              to="/admin"
            >
              Admin Portal
            </Link>
          )}
          {userGroup === "Maintenance" && (
            <Link
              className="button button--secondary button--lg"
              to="/logs"
            >
              check the logs
            </Link>
          )}
          {userGroup === "Professor" && (
            <Link
              className="button button--secondary button--lg"
              to="/prof"
            >
              Direction Tools
            </Link>
          )}
          {userGroup === "Direction" && (
            <Link
              className="button button--secondary button--lg"
              to="/direction/tools"
            >
              Direction Tools
            </Link>
          )}
          {userGroup === "Students" && (
            <Link
              className="button button--secondary button--lg"
              to="/studentpage"
            >
              Student Portal
            </Link>
          )}
          {!userGroup && (
            <p>You do not have access to specific tools.</p>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    const getUserGroup = async () => {
      const groupClaims = await fetchUserInfo();
      // Match the user's group ID to your defined groups
      const matchedGroup = groupClaims.find(groupId => groupsMap[groupId]);
      setUserGroup(groupsMap[matchedGroup] || null);
    };

    getUserGroup();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader userGroup={userGroup} />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
