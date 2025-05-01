import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultExpense = {
  title: '',
  amount: '',
  category: '',
  date: '',
  paymentMethod: '',
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(defaultExpense);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editingId ? { ...form, id: editingId } : exp))
      );
      setEditingId(null);
    } else {
      setExpenses([...expenses, { ...form, id: uuidv4() }]);
    }

    setForm(defaultExpense);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((exp) => exp.id === id);
    setForm(expense);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>{editingId ? 'Edit' : 'Add'} Expense</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="paymentMethod" placeholder="Payment Method" value={form.paymentMethod} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Expense</button>
      </form>

      <h3>All Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount ($)</th>
              <th>Category</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>{exp.amount}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td>{exp.paymentMethod}</td>
                <td>
                  <button onClick={() => handleEdit(exp.id)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
