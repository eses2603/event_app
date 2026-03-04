import React, { useState, useEffect, useRef } from "react";
import "../styles/profile.css";

const Icon = ({ name }) => {
  const icons = {
    profile: "👤",
    settings: "⚙️",
    logout: "🚪",
    help: "❓",
    security: "🔒",
    notification: "🔔",
    theme: "🎨",
    arrow: "▼",
    check: "✅",
    close: "✕"
  };

  return <span className="icon">{icons[name]}</span>;
};

const ProfileDropdown = ({
  user,
  onLogout,
  onThemeToggle,
  darkMode,
  isOpen,
  onClose
}) => {
  const dropdownRef = useRef(null);

  // Kullanıcı bilgileri - gerçek uygulamada API'den gelecek
  const userData = {
    name: user?.name || "Erdem",
    email: user?.email || "erdem@didiyos.com",
    role: user?.role || "Admin",
    avatar: user?.avatar || null,
    lastLogin: user?.lastLogin || "2024-01-15 14:30"
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleProfileClick = () => {
    onClose();
    console.log("Profile clicked - would navigate to profile page");
  };

  const handleSettingsClick = () => {
    onClose();
    console.log("Settings clicked - would open settings modal");
  };

  const handleHelpClick = () => {
    onClose();
    console.log("Help clicked - would open help center");
  };

  const handleSecurityClick = () => {
    onClose();
    console.log("Security clicked - would open security settings");
  };

  const handleNotificationSettingsClick = () => {
    onClose();
    console.log("Notification settings clicked");
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  const formatLastLogin = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal"
        onClick={(e) => e.stopPropagation()}
        ref={dropdownRef}
      >
        {/* Header with Close Button - BİLDİRİMLER GİBİ */}
        <div className="profile-modal-header">
          <div className="header-title">
            <Icon name="profile" />
            <h2>Profile & Settings</h2>
          </div>
          <button className="close-profile-btn" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="profile-content">
          {/* User Info Section */}
          <div className="user-info-section">
            <div className="user-avatar-large">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} />
              ) : (
                <span>{userData.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="user-details">
              <div className="user-name">{userData.name}</div>
              <div className="user-email">{userData.email}</div>
              <div className="user-role">{userData.role}</div>
              <div className="last-login">
                Last login: {formatLastLogin(userData.lastLogin)}
              </div>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Quick Actions */}
          <div className="profile-section">
            <h3>Quick Actions</h3>
            <button className="profile-item" onClick={handleProfileClick}>
              <Icon name="profile" />
              <span>My Profile</span>
              <div className="item-arrow">→</div>
            </button>
            <button className="profile-item" onClick={handleSettingsClick}>
              <Icon name="settings" />
              <span>Account Settings</span>
              <div className="item-arrow">→</div>
            </button>
            <button
              className="profile-item"
              onClick={handleNotificationSettingsClick}
            >
              <Icon name="notification" />
              <span>Notification Settings</span>
              <div className="item-arrow">→</div>
            </button>
          </div>

          <div className="profile-divider"></div>

          {/* Preferences */}
          <div className="profile-section">
            <h3>Preferences</h3>
            <button className="profile-item" onClick={onThemeToggle}>
              <Icon name="theme" />
              <span>Theme</span>
              <div className="theme-setting">
                <span className="theme-label">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </span>
                <div className="theme-indicator">{darkMode ? "🌙" : "☀️"}</div>
              </div>
            </button>
            <button className="profile-item" onClick={handleSecurityClick}>
              <Icon name="security" />
              <span>Privacy & Security</span>
              <div className="item-arrow">→</div>
            </button>
          </div>

          <div className="profile-divider"></div>

          {/* Support */}
          <div className="profile-section">
            <button className="profile-item" onClick={handleHelpClick}>
              <Icon name="help" />
              <span>Help & Support</span>
              <div className="item-arrow">→</div>
            </button>
          </div>

          <div className="profile-divider"></div>

          {/* Logout */}
          <div className="profile-section">
            <button className="profile-item logout" onClick={handleLogout}>
              <Icon name="logout" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="profile-footer">
          <div className="app-version">
            <span>Didiyos Analytics v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
