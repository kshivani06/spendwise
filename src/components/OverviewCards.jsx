import React from 'react';

export default function OverviewCards({ income, expense, balance, transactions, onNavigate }) {
  const recent = transactions.slice(0, 4);
  const spentRatio = income > 0 ? Math.min((expense / income) * 100, 100) : 0;
  const isOverBudget = spentRatio > 80;

  return (
    <div className="view dashboard-view">
      <div className="view-header">
        <h2>Financial Overview</h2>
        <button className="primary-btn" onClick={onNavigate}>
          + New Transaction
        </button>
      </div>
      
      <div className="cards-grid">
        <div className="summary-card card-income">
          <span className="card-title">Total Income</span>
          <h3 className="card-amount">₹{income.toLocaleString()}</h3>
        </div>

        <div className="summary-card card-expense">
          <span className="card-title">Total Expenses</span>
          <h3 className="card-amount">₹{expense.toLocaleString()}</h3>
        </div>

        <div className="summary-card card-balance">
          <span className="card-title">Remaining Balance</span>
          <h3 className="card-amount">₹{balance.toLocaleString()}</h3>
        </div>
      </div>

      {/* Budget Utilization Progress Bar */}
      <div className="budget-meter-card">
        <div className="budget-meter-header">
          <span>Monthly Budget Utilization: <strong>{spentRatio.toFixed(1)}%</strong></span>
          <span>Income Ceiling: <strong>₹{income.toLocaleString()}</strong></span>
        </div>
        <div className="budget-track">
          <div 
            className="budget-fill" 
            style={{ 
              width: `${spentRatio}%`,
              background: isOverBudget 
                ? 'linear-gradient(90deg, #f472b6, #fb7185)' 
                : 'linear-gradient(90deg, #f5d061, #f472b6)' 
            }} 
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-section">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem', color: 'var(--text-muted)' }}>
          Recent Transactions
        </h3>
        {recent.length === 0 ? (
          <p className="empty-msg">No transactions recorded yet.</p>
        ) : (
          <ul className="recent-list">
            {recent.map((tx) => (
              <li key={tx.id} className="recent-item">
                <div className="tx-details">
                  <span className="tx-title">{tx.title}</span>
                  <span className="tx-meta">{tx.category} • {tx.date}</span>
                </div>
                <span className={tx.type === 'income' ? 'amt-inc' : 'amt-exp'}>
                  {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}