import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import StatusOverview from './StatusOverview';
import ProjectsByArea from './ProjectsByArea';
import Budget from './Budget';
import ProjectSize from './ProjectSize';
import PriorityProjects from './PriorityProjects';
import CircularProgressChart from '../Shared/CircularProgressChart';
import { fetchStatusOverview } from '../../services/apiClient';

const Dashboard: React.FC = () => {
  const [completedPercent, setCompletedPercent] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  useEffect(() => {
    fetchStatusOverview()
      .then((statuses) => {
        console.log("Fetched statuses:", statuses);
  
        if (!statuses || Object.keys(statuses).length === 0) {
          console.warn("Statuses object is empty!");
          return;
        }
  
        const mappedStatuses: Record<string, number> = {
          Completed: statuses['Complete'] || 0,
          'On Hold': statuses['Paused'] || 0,
          'Not Started': statuses['Not Started'] || 0,
          'In Progress': statuses['In Progress'] || 0,
        };
  
        console.log("Mapped statuses:", mappedStatuses);
  
        const completed = mappedStatuses['Completed'];
        const total = Object.values(mappedStatuses).reduce((sum, val) => sum + val, 0);
  
        console.log("Total Projects:", total);
        console.log("Completed Projects:", completed);
  
        setTotalProjects(total);
        setCompletedPercent(total > 0 ? Math.round((completed / total) * 100) : 0);
      })
      .catch(console.error);
  }, []);

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
                <CircularProgressChart 
                  percentage={completedPercent} 
                  total={totalProjects} 
                  fillColor="#B2ED11" 
                />
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
