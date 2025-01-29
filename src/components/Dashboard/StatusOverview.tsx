import React, { useEffect, useState } from 'react';
import styles from './StatusOverview.module.scss';
import { fetchStatusOverview } from '../../services/apiClient';

type StatusCounts = {
  [key: string]: number;
};

function normalizeStatusKey(status: string): string {
  switch (status) {
    case 'Complete':
      return 'Completed';
    case 'Paused':
      return 'On Hold';
    case 'In Progress':
      return 'In Progress';
    case 'Not Started':
      return 'Not Started';
    default:
      return status;
  }
}

const StatusOverview: React.FC = () => {
  const [statuses, setStatuses] = useState<StatusCounts>({});

  useEffect(() => {
    fetchStatusOverview()
      .then((rawData: StatusCounts) => {
        const mapped: StatusCounts = {};
        Object.entries(rawData).forEach(([key, count]) => {
          const newKey = normalizeStatusKey(key);
          mapped[newKey] = (mapped[newKey] || 0) + count;
        });
        setStatuses(mapped);
      })
      .catch(console.error);
  }, []);

  const completed = statuses['Completed'] || 0;
  const notStarted = statuses['Not Started'] || 0;
  const inProgress = statuses['In Progress'] || 0;
  const onHold = statuses['On Hold'] || 0;
  const total = Object.values(statuses).reduce((sum, val) => sum + val, 0);
  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.statusOverviewContainer}>
      <div className={styles.statusText}>
        <div className={styles.statusList}>
          <h3>Project Status Overview</h3>
          <p>
            <span data-status="completed">{completed}</span> completed
          </p>
          <p>
            <span data-status="not-started">{notStarted}</span> not started
          </p>
          <p>
            <span data-status="in-progress">{inProgress}</span> in progress
          </p>
          <p>
            <span data-status="on-hold">{onHold}</span> on hold
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusOverview;
