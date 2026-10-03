import React, { useState } from 'react';

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.title.trim()) {
      err.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      err.title = 'Title must be at least 3 characters';
    }

    if (!formData.amount) {
      err.amount = 'Amount is required';
    } else if (Number(formData.amount) <= 0) {
      err.amount = 'Amount must be greater than zero';
    }

    if (!formData.date) {
      err.date = 'Date is required';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd({
      id: Date.now(),
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    });
  };

  return (
    <div className="view form-view">
      <div className="view-header">
        <h2>Add Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="entry-form" noValidate>
        <div className="form-group">
          <label>Transaction Title</label>
          <input
            type="text"
            name="title"
            placeholder="Food / Salary / Books"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              step="any"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className={errors.amount ? 'input-error' : ''}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Food">Food</option>
              <option value="Salary">Salary</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>

        <button type="submit" className="primary-btn submit-btn">
          Save Transaction
        </button>
      </form>
    </div>
  );
}