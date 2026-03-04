import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const LoginCharts = () => {
  // Mock data
  const weeklyData = [
    { day: "Mon", logins: 120 },
    { day: "Tue", logins: 150 },
    { day: "Wed", logins: 180 },
    { day: "Thu", logins: 200 },
    { day: "Fri", logins: 220 },
    { day: "Sat", logins: 180 },
    { day: "Sun", logins: 160 }
  ];

  const monthlyData = [
    { month: "Jan", logins: 1200 },
    { month: "Feb", logins: 1500 },
    { month: "Mar", logins: 1800 },
    { month: "Apr", logins: 2000 },
    { month: "May", logins: 2200 },
    { month: "Jun", logins: 2500 }
  ];

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Weekly Login Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="logins"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart">
        <h3>Monthly Login Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="logins" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoginCharts;
