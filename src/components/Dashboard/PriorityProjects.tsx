import React, { useEffect, useState } from 'react';
import styles from './PriorityProjects.module.scss';
import { fetchPriorityProjects } from '../../services/apiClient';

interface PriorityProjectsData {
  High: number;
  Medium: number;
  Low: number;
}

const PriorityProjects: React.FC = () => {
  const [priorityData, setPriorityData] = useState<PriorityProjectsData | null>(null);

  useEffect(() => {
    fetchPriorityProjects()
      .then((data: PriorityProjectsData) => setPriorityData(data))
      .catch(console.error);
  }, []);

  if (!priorityData) {
    return <div className={styles.placeholder}>Loading...</div>;
  }

  return (
    <div className={styles.priorityProjectsContainer}>
      <h3>Priority Projects</h3>
      <div className={styles.priorityList}>
        {Object.entries(priorityData).map(([priority, count]) => (
          <div key={priority} className={`${styles.priorityItem} ${styles[priority.toLowerCase()]}`}>
            <span className={styles.priorityLabel}>{priority}</span>
            <span className={styles.priorityCount}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityProjects;
