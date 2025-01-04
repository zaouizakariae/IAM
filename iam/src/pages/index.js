import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// Group mappings based on Azure AD Group IDs
const groupMappings = {
  "96a55f06-44bd-42ac-9b13-1b9b44071093": { text: "Manage System", link: "/admin" },
  "e21d94c3-d9d5-414b-865b-79989deb4849": { text: "View Direction Reports", link: "/direction" },
  "49c5b0ba-1dad-4afb-b124-632a4b9f4722": { text: "View Teaching Tools", link: "/external-professors" },
  "34828a01-3530-4e24-9586-660d9979c68": { text: "HR Dashboard", link: "/hr" },
  "c09d0aad-1670-4ff9-b6c6-7ba8da949ca9": { text: "Maintenance Dashboard", link: "/maintenance" },
  "5871d88a-63b5-499f-b4ef-5a7303cd7136": { text: "Publish Research", link: "/professors" },
  "942df11e-7c4e-444a-a75a-7c2c1c5b568e": { text: "Manage Enrollment", link: "/scolarite" },
  "88439227-1256-4a2e-b9ce-7adc68208ebc": { text: "Access Courses", link: "/students" },
};



function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [buttonContent, setButtonContent] = useState({ text: "Loading...", link: "#" });

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("StaticWebAppsAuthCookie"))
      ?.split("=")[1];

    if (token) {
      const claims = parseJwt(token);
      const groups = claims["groups"] || [];
      const groupButton = getButtonFromGroups(groups);
      setButtonContent(groupButton);
    }
  }, []);
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          University
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to={buttonContent.link}>
            {buttonContent.text}
          </Link>
        </div>
      </div>
    </header>
  );
}

// Helper Functions
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function getButtonFromGroups(groups) {
  for (const groupId of groups) {
    if (groupMappings[groupId]) {
      return groupMappings[groupId];
    }
  }
  return { text: "Learn More", link: "/info" }; // Default for unknown groups
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
