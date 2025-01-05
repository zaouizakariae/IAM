import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

async function fetchUserInfo() {
  const tokenEndpoint = "https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552/oauth2/v2.0/token";
  const graphEndpoint = "https://graph.microsoft.com/v1.0/me";

  // Step 1: Get Access Token
  const tokenResponse = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: "YOUR_CLIENT_ID",
      client_secret: "YOUR_CLIENT_SECRET",
      grant_type: "client_credentials", // Or authorization_code
      scope: "https://graph.microsoft.com/.default", // Scope for Microsoft Graph API
    }),
  });

  const { access_token } = await tokenResponse.json();

  // Step 2: Fetch User Info
  const userResponse = await fetch(graphEndpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userInfo = await userResponse.json();
  console.log("User Info:", userInfo);
}

fetchUserInfo();



function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          University
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
        <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
        </Link>
        </div>
      </div>
    </header>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
