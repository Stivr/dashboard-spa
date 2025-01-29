import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import styles from './CircularProgressChart.module.scss';

interface CircularProgressProps {
  percentage: number;
  total: number;
  fillColor?: string;
}

const CircularProgressChart: React.FC<CircularProgressProps> = ({
  percentage,
  total,
  fillColor = '#B2ED11',
}) => {
  const data = [{ name: 'Completed', value: percentage, fill: fillColor }];

  return (
    <div style={{ width: 314, height: 314, position: 'relative' }}>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={11}
          data={data}
          startAngle={450}
          endAngle={90}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar dataKey="value" background={{ fill: '#e0e0e0' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className={styles.radialChartContainer}>
        <p className={styles.percentage}>{percentage}%</p>

        <p className={styles.multiLineText}>
          <span>of {total}</span>
          <span>projects</span>
          <span>completed</span>
        </p>
      </div>
    </div>
  );
};

export default CircularProgressChart;
