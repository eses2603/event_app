import React from "react";
import StatsCards from "../components/Dashboard/StatsCards";
import LoginCharts from "../components/Dashboard/LoginCharts";
import EventsList from "../components/Dashboard/EventsList";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <StatsCards />
      <div className="charts-section">
        <LoginCharts />
      </div>
      <EventsList />
    </div>
  );
};

export default DashboardPage;
