import React from 'react';
import styles from './Dashboard.module.scss';
import StatusOverview from './StatusOverview';
import ProjectsByArea from './ProjectsByArea';
import Budget from './Budget';
import ProjectSize from './ProjectSize';
import PriorityProjects from './PriorityProjects';
import CircularProgressChart from '../Shared/CircularProgressChart';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Roadmap Title</h1>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/company-logo.png`}
          alt="Company Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.statusOverviewWrapper}>
            <div className={styles.circleWrapper}>
              <div className={styles.chartInner}>
                <CircularProgressChart percentage={24} total={25} fillColor="#B2ED11" />
              </div>
            </div>

            <div className={styles.statusOverview}>
              <StatusOverview />
            </div>
          </div>

          <div className={styles.projectsByArea}>
            <ProjectsByArea />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.budget}>
            <Budget />
          </div>
          <div className={styles.projectSize}>
            <ProjectSize />
          </div>
          <div className={styles.priorityProjects}>
            <PriorityProjects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
