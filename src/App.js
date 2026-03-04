import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SearchModal from "./components/SearchModal";
import NotificationsModal from "./components/NotificationsModal";
import ProfileDropdown from "./components/ProfileDropdown";
import "./styles/dashboard.css";

const Icon = ({ name, className = "" }) => {
  const icons = {
    dashboard: "📊",
    users: "👥",
    reports: "📋",
    logout: "🚪",
    chart: "📈",
    user: "👤",
    calendar: "📅",
    trophy: "🏆",
    bell: "🔔",
    search: "🔍",
    arrow: "▼",
    profile: "👨‍💼",
    sun: "☀️",
    moon: "🌙",
    facebook: "𝐟",
    youtube: "▶️",
    x: "𝕏"
  };

  return <span className={`icon ${className}`}>{icons[name]}</span>;
};

const TopNav = ({
  darkMode,
  toggleDarkMode,
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
  notificationCount,
  user
}) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/users", label: "User Management", icon: "users" },
    { path: "/reports", label: "Report Management", icon: "reports" }
  ];

  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <Icon name="chart" className="logo-icon" />
        <span className="brand-text">Didiyos Analytics</span>
      </div>

      <div className="nav-center">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Icon name={item.icon} className="nav-icon" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button className="nav-action-btn" onClick={toggleDarkMode}>
          <Icon name={darkMode ? "sun" : "moon"} />
        </button>
        <button className="nav-action-btn" onClick={onSearchClick}>
          <Icon name="search" />
        </button>
        <button className="nav-action-btn" onClick={onNotificationsClick}>
          <Icon name="bell" />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>

        {/* Profile Trigger Button - OK SİMGESİ EKLENDİ */}
        <div className="profile-dropdown-container">
          <button className="profile-trigger" onClick={onProfileClick}>
            <div className="profile-avatar">
              <span>{user?.name?.charAt(0).toUpperCase() || "E"}</span>
            </div>
            <span className="profile-name">{user?.name || "Erdem"}</span>
            {/* AŞAĞI OK SİMGESİ EKLENDİ */}
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <span>Didiyos © 2025 All Rights Reserved</span>
        </div>
        <div className="social-links">
          <a href="#" className="social-link">
            <Icon name="x" />
          </a>
          <a href="#" className="social-link">
            <Icon name="facebook" />
          </a>
          <a href="#" className="social-link">
            <Icon name="youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [user, setUser] = useState({
    name: "Erdem",
    email: "erdem@didiyos.com",
    role: "Admin",
    lastLogin: "2024-01-15T14:30:00"
  });
  const [searchData, setSearchData] = useState({
    users: [],
    reports: [],
    events: []
  });

  // Mock data for search
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        email: "ahmet@didiyos.com",
        role: "Admin",
        status: "Active"
      },
      {
        id: 2,
        name: "Mehmet Demir",
        email: "mehmet@didiyos.com",
        role: "Manager",
        status: "Active"
      },
      {
        id: 3,
        name: "Ayşe Kaya",
        email: "ayse@didiyos.com",
        role: "User",
        status: "Inactive"
      }
    ];

    const mockReports = [
      {
        id: 1,
        title: "Q4 Performance Analysis",
        type: "Performance",
        status: "Published",
        author: "Ahmet Yılmaz",
        description: "Quarterly performance analysis and insights"
      },
      {
        id: 2,
        title: "User Engagement Report",
        type: "Analytics",
        status: "Draft",
        author: "Mehmet Demir",
        description: "Monthly user engagement metrics and trends"
      }
    ];

    const mockEvents = [
      {
        id: 1,
        title: "Monthly Review Meeting",
        type: "Meeting",
        date: "2024-01-20",
        description: "Monthly performance review and planning"
      },
      {
        id: 2,
        title: "Product Launch Webinar",
        type: "Webinar",
        date: "2024-01-25",
        description: "New product features announcement"
      }
    ];

    setSearchData({
      users: mockUsers,
      reports: mockReports,
      events: mockEvents
    });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };

  const handleNotificationsClose = () => {
    setShowNotifications(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  const handleLogout = () => {
    // Gerçek uygulamada burada logout logic olacak
    console.log("Logging out...");
    alert("Logout functionality would be implemented here!");
    handleProfileClose();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setShowSearch(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "j") {
        event.preventDefault();
        setShowNotifications(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "p") {
        event.preventDefault();
        setShowProfile(true);
      }
      if (event.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <TopNav
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onSearchClick={handleSearchClick}
          onNotificationsClick={handleNotificationsClick}
          onProfileClick={handleProfileClick}
          notificationCount={notificationCount}
          user={user}
        />

        <div className="main-content">
          <div className="welcome-banner">
            <h1>Welcome Back! 👋</h1>
            <p>Here's what's happening with your platform today.</p>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>

        <Footer />

        {/* Search Modal */}
        <SearchModal
          isOpen={showSearch}
          onClose={handleSearchClose}
          searchData={searchData}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={showNotifications}
          onClose={handleNotificationsClose}
          notificationCount={notificationCount}
        />

        {/* Profile Modal */}
        <ProfileDropdown
          isOpen={showProfile}
          onClose={handleProfileClose}
          user={user}
          onLogout={handleLogout}
          onThemeToggle={toggleDarkMode}
          darkMode={darkMode}
        />
      </div>
    </Router>
  );
}

export default App;
