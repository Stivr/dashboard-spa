import React, { useEffect, useState } from 'react';
import styles from './ProjectsByArea.module.scss';
import { fetchProjectsByArea } from '../../services/apiClient';

type AreaData = {
  area: string;
  count: number;
};

const ProjectsByArea: React.FC = () => {
  const [areaData, setAreaData] = useState<AreaData[]>([]);

  useEffect(() => {
    fetchProjectsByArea()
      .then(setAreaData)
      .catch(console.error);
  }, []);

  return (
    <div className={styles.projectsByAreaContainer}>
      <div className={styles.title}>Projects by Area</div>

      <div className={styles.areaTable}>
        {areaData.map((item, idx) => (
          <div className={styles.areaRow} key={idx}>
            <div className={styles.areaName}>{item.area}</div>
            <div className={styles.areaCount}>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsByArea;
