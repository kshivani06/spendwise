import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">SpendWise</div>
      <div className="nav-links">
        <button 
          className={currentView === 'dashboard' ? 'active' : ''} 
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={currentView === 'transactions' ? 'active' : ''} 
          onClick={() => setCurrentView('transactions')}
        >
          Transactions
        </button>
        <button 
          className={currentView === 'add' ? 'active' : ''} 
          onClick={() => setCurrentView('add')}
        >
          + Add Entry
        </button>
      </div>
    </nav>
  );
}