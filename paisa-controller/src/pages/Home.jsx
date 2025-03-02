import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../styles/home.css";

const COLORS = ["#00C49F", "#FF4444"];

const Home = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    totalBalance: 0,
    monthlyBudget: 0,
    savingsGoal: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", user);
      console.log("User data saved:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const totalIncome = 5000;
  const totalExpenses = 3200;
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  return (
    <div className="home">
      <h1>Welcome to Paisa Controller</h1>
      <p>Track your expenses and manage your budget easily.</p>

      {!submitted ? (
        <form className="user-form" onSubmit={handleSubmit}>
          <h2>Enter Your Details</h2>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="number" name="totalBalance" placeholder="Total Balance" onChange={handleChange} required />
          <input type="number" name="monthlyBudget" placeholder="Monthly Budget" onChange={handleChange} required />
          <input type="number" name="savingsGoal" placeholder="Savings Goal" onChange={handleChange} required />
          <button type="submit">Save Details</button>
        </form>
      ) : (
        <div className="dashboard">
          <h2>Financial Dashboard</h2>

          <div className="grid-container">
            {/* Current Balance */}
            <div className="card balance">
              <h3>Current Balance</h3>
              <p>${user.totalBalance}</p>
            </div>

            {/* Expense vs. Income Graph */}
            <div className="card chart">
              <h3>Expense vs. Income</h3>
              <PieChart width={200} height={200}>
                <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Budget Usage */}
            <div className="card budget">
              <h3>Budget Usage</h3>
              <div className="progress">
                <span>Food</span>
                <div className="progress-bar" style={{ width: "75%", backgroundColor: "#FF4444" }}>75%</div>
              </div>
              <div className="progress">
                <span>Travel</span>
                <div className="progress-bar" style={{ width: "60%", backgroundColor: "#FFA500" }}>60%</div>
              </div>
            </div>

            {/* Upcoming Bills & Reminders */}
            <div className="card reminders">
              <h3>Upcoming Bills & Reminders</h3>
              <p>🔥 Electricity Bill - Due in 3 days</p>
              <p>⏳ Rent - Due in 7 days</p>
            </div>

            {/* AI Insights & Recommendations */}
            <div className="card insights">
              <h3>AI Insights & Recommendations</h3>
              <p>💡 You spent 20% more on dining this month.</p>
              <p>🔹 Consider reducing entertainment expenses to save more.</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="floating-btn">+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
