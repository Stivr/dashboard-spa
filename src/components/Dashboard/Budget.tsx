import React, { useEffect, useState } from 'react';
import styles from './Budget.module.scss';
import { fetchBudgetSummary } from '../../services/apiClient';

interface BudgetBreakdown {
  [key: string]: number;
}

interface BudgetData {
  totalBudget: number;
  breakdown: BudgetBreakdown;
}

const Budget: React.FC = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);

  useEffect(() => {
    fetchBudgetSummary()
      .then((data) => setBudgetData(data))
      .catch(console.error);
  }, []);

  if (!budgetData) {
    return <div>Loading...</div>;
  }

  const { totalBudget, breakdown } = budgetData;

  return (
    <div className={styles.budgetContainer}>
      <div className={styles.summarySection}>
        <h3>Budget</h3>
        <div className={styles.summaryItem}>
          <div className={styles.label}>Total:</div>
          <div className={styles.value}>£{totalBudget.toLocaleString()}</div>
        </div>
      </div>

      <div className={styles.breakdownSection}>
        {Object.entries(breakdown).map(([area, amount]) => (
          <div className={styles.breakdownItem} key={area}>
            <div className={styles.areaName}>{area}:</div>
            <div className={styles.amount}>£{amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
