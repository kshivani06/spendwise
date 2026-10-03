import React, { useState } from 'react';

const CATEGORIES = ['All', 'Salary', 'Food', 'Education', 'Travel', 'Entertainment', 'Utilities'];

export default function TransactionList({ transactions, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all');

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesType = selectedType === 'all' || t.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleExportCSV = () => {
    if (transactions.length === 0) return;
    const headers = 'ID,Title,Amount,Type,Category,Date\n';
    const rows = transactions
      .map((t) => `${t.id},"${t.title}",${t.amount},${t.type},${t.category},${t.date}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="view transactions-view">
      <div className="view-header">
        <h2>Transaction History</h2>
        <button className="secondary-btn" onClick={handleExportCSV}>
          ↓ Export CSV
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="pills-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`pill ${selectedCategory === cat ? 'pill-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="list-container">
        {filtered.length === 0 ? (
          <p className="empty-msg">No transactions found matching your criteria.</p>
        ) : (
          filtered.map((tx) => (
            <div key={tx.id} className={`tx-item border-${tx.type}`}>
              <div className="tx-details">
                <span className="tx-title">{tx.title}</span>
                <span className="tx-meta">{tx.category} • {tx.date}</span>
              </div>
              <div className="tx-actions">
                <span className={tx.type === 'income' ? 'amt-inc' : 'amt-exp'}>
                  {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString()}
                </span>
                <button 
                  className="del-btn" 
                  onClick={() => onDelete(tx.id)} 
                  title="Delete record"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}