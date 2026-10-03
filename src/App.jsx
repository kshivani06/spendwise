import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewCards from './components/OverviewCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './index.css';

const INITIAL_DATA = [
  { id: 1, title: 'Internship Stipend', amount: 45000, type: 'income', category: 'Salary', date: '2026-09-25' },
  { id: 2, title: 'Technical Textbooks', amount: 3500, type: 'expense', category: 'Education', date: '2026-09-28' },
  { id: 3, title: 'Hostel Groceries', amount: 4449, type: 'expense', category: 'Food', date: '2026-10-01' },
];

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('spendwise_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('spendwise_data', JSON.stringify(transactions));
  }, [transactions]);

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAdd = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('transactions');
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main>
        {currentView === 'dashboard' && (
          <OverviewCards
            income={totalIncome}
            expense={totalExpense}
            balance={balance}
            transactions={transactions}
            onNavigate={() => setCurrentView('add')}
          />
        )}

        {currentView === 'transactions' && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        )}

        {currentView === 'add' && (
          <TransactionForm onAdd={handleAdd} />
        )}
      </main>
    </div>
  );
}