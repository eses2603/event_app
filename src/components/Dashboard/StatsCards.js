import React, { useState, useEffect } from "react";

const Icon = ({ name }) => {
  const icons = {
    online: "👁️",
    login: "🔑",
    calendar: "📅",
    event: "🎯",
    trophy: "🏆",
    trending: "📈",
    daily: "📊",
    week: "🗓️"
  };

  return <span className="icon">{icons[name]}</span>;
};

const StatsCards = () => {
  const [stats, setStats] = useState({
    onlinePeople: 0,
    weeklyLogins: 0,
    monthlyLogins: 0,
    dailyLogins: 0,
    eventsToday: 0,
    eventsMonthly: 0,
    eventsThisWeek: 0,
    topCreator: ""
  });

  useEffect(() => {
    const targetStats = {
      onlinePeople: 156,
      weeklyLogins: 1247,
      monthlyLogins: 5289,
      dailyLogins: 342,
      eventsToday: 23,
      eventsMonthly: 156,
      eventsThisWeek: 67,
      topCreator: "Ahmet Yılmaz"
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targetStats).forEach((key) => {
      if (typeof targetStats[key] === "number") {
        let current = 0;
        const increment = targetStats[key] / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetStats[key]) {
            setStats((prev) => ({ ...prev, [key]: targetStats[key] }));
            clearInterval(timer);
          } else {
            setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, stepDuration);
      } else {
        setStats((prev) => ({ ...prev, [key]: targetStats[key] }));
      }
    });
  }, []);

  const statCards = [
    {
      title: "Online People",
      value: stats.onlinePeople,
      icon: "online",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Weekly Logins",
      value: stats.weeklyLogins,
      icon: "login",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Daily Logins",
      value: stats.dailyLogins,
      icon: "daily",
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Monthly Logins",
      value: stats.monthlyLogins,
      icon: "trending",
      trend: "+23%",
      trendUp: true
    },
    {
      title: "Events Today",
      value: stats.eventsToday,
      icon: "calendar",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Events This Week",
      value: stats.eventsThisWeek,
      icon: "week",
      trend: "+18%",
      trendUp: true
    },
    {
      title: "Events This Month",
      value: stats.eventsMonthly,
      icon: "event",
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Top Event Creator",
      value: stats.topCreator,
      icon: "trophy",
      trend: "Top Performer",
      trendUp: true
    }
  ];

  return (
    <div className="stats-cards">
      {statCards.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className="stat-content">
              <h3>{card.title}</h3>
              <div className="stat-number">{card.value}</div>
              <div
                className={`stat-trend ${
                  card.trendUp ? "trend-up" : "trend-down"
                }`}
              >
                <span>📈</span>
                {card.trend}
              </div>
            </div>
            <div className="stat-icon">
              <Icon name={card.icon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
