import React, { useEffect, useState } from 'react';
import styles from './ProjectSize.module.scss';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';
import { fetchProjectSizeSummary } from '../../services/apiClient';

type SizeData = {
  size: string;
  count: number;
};

const ProjectSize: React.FC = () => {
  const [sizeData, setSizeData] = useState<SizeData[]>([]);

  useEffect(() => {
    fetchProjectSizeSummary()
      .then((data: SizeData[]) => {
        const orderedData = ['Small', 'Medium', 'Large'].map((size) => ({
          size,
          count: data.find((d) => d.size === size)?.count || 0,
        }));
        setSizeData(orderedData);
      })
      .catch(console.error);
  }, []);

  const renderCustomLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const barColor =
      sizeData[index]?.size === 'Small'
        ? '#B2ED11'
        : sizeData[index]?.size === 'Medium'
        ? '#150035'
        : '#AAAAF9';

    const textColor = barColor === '#150035' ? '#FFFFFF' : '#150035';

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        dy={4}
        textAnchor="middle"
        fill={textColor}
        fontSize={18}
        fontWeight="700"
      >
        {value}
      </text>
    );
  };

  return (
    <div className={styles.projectSizeContainer}>
      <h3>Project Size</h3>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          data={sizeData}
          layout="horizontal"
          barCategoryGap="10%"
        >
          <XAxis
            dataKey="size"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: '#150035',
              fontSize: 18,
            }}
          />
          <Bar dataKey="count" label={renderCustomLabel} radius={[10, 10, 0, 0]} barSize={120}>
            {sizeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.size === 'Small'
                    ? '#B2ED11'
                    : entry.size === 'Medium'
                    ? '#150035'
                    : '#AAAAF9'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectSize;
