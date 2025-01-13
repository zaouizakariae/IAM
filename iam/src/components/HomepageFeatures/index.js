import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Student Portal',
    Svg: require('@site/static/img/s.svg').default,
    description: (
      <>
        Student portal for accessing notes, assignments, and other resources.
      </>
    ),
  },
  {
    title: 'Professor Tools',
    Svg: require('@site/static/img/p.svg').default,
    description: (
      <>
        Professor tools for managing courses, assignments, and grades.
      </>
    ),
  },
  {
    title: 'Admin Dashoard',
    Svg: require('@site/static/img/a.svg').default,
    description: (
      <>
        Admin dashboard for managing users deleting accounts, and more.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
