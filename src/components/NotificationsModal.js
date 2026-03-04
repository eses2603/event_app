import React, { useState, useEffect } from "react";
import "../styles/notifications.css";

const Icon = ({ name }) => {
  const icons = {
    close: "✕",
    bell: "🔔",
    check: "✅",
    trash: "🗑️",
    settings: "⚙️",
    user: "👤",
    report: "📊",
    event: "📅",
    warning: "⚠️",
    success: "✅",
    info: "ℹ️",
    error: "❌"
  };

  return <span className="icon">{icons[name]}</span>;
};

const NotificationsModal = ({ isOpen, onClose, notificationCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(notificationCount);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "success",
        title: "New User Registered",
        message: "Ahmet Yılmaz has just registered to the platform",
        time: "2 minutes ago",
        read: false,
        category: "user"
      },
      {
        id: 2,
        type: "info",
        title: "Report Generated",
        message: "Monthly analytics report has been successfully generated",
        time: "1 hour ago",
        read: false,
        category: "report"
      },
      {
        id: 3,
        type: "warning",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight at 2:00 AM",
        time: "3 hours ago",
        read: true,
        category: "system"
      },
      {
        id: 4,
        type: "error",
        title: "Failed Login Attempt",
        message: "Multiple failed login attempts detected from unknown IP",
        time: "5 hours ago",
        read: true,
        category: "security"
      },
      {
        id: 5,
        type: "success",
        title: "Event Created",
        message: "New team meeting scheduled for tomorrow",
        time: "1 day ago",
        read: true,
        category: "event"
      },
      {
        id: 6,
        type: "info",
        title: "New Feature Available",
        message: "Check out the new advanced reporting features",
        time: "2 days ago",
        read: true,
        category: "system"
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (!notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const getNotificationIcon = (type, category) => {
    if (category === "user") return <Icon name="user" />;
    if (category === "report") return <Icon name="report" />;
    if (category === "event") return <Icon name="event" />;
    if (category === "security") return <Icon name="warning" />;

    switch (type) {
      case "success":
        return <Icon name="success" />;
      case "warning":
        return <Icon name="warning" />;
      case "error":
        return <Icon name="error" />;
      default:
        return <Icon name="info" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "success":
        return "Success";
      case "warning":
        return "Warning";
      case "error":
        return "Error";
      case "info":
        return "Info";
      default:
        return "Info";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    return notification.category === activeFilter;
  });

  const getCategoryName = (category) => {
    switch (category) {
      case "user":
        return "Users";
      case "report":
        return "Reports";
      case "event":
        return "Events";
      case "system":
        return "System";
      case "security":
        return "Security";
      default:
        return "General";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="notifications-modal-overlay" onClick={onClose}>
      <div className="notifications-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-header">
          <div className="header-title">
            <Icon name="bell" />
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>

          <div className="header-actions">
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                <Icon name="check" />
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="clear-all" onClick={clearAll}>
                <Icon name="trash" />
                Clear all
              </button>
            )}
            <button className="close-notifications" onClick={onClose}>
              <Icon name="close" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="notifications-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "unread" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`filter-btn ${activeFilter === "user" ? "active" : ""}`}
            onClick={() => setActiveFilter("user")}
          >
            Users
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "report" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("report")}
          >
            Reports
          </button>
          <button
            className={`filter-btn ${activeFilter === "event" ? "active" : ""}`}
            onClick={() => setActiveFilter("event")}
          >
            Events
          </button>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            <div className="notifications-container">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    notification.read ? "read" : "unread"
                  } ${notification.type}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(
                      notification.type,
                      notification.category
                    )}
                  </div>

                  <div className="notification-content">
                    <div className="notification-header">
                      <h4 className="notification-title">
                        {notification.title}
                      </h4>
                      <span className="notification-time">
                        {notification.time}
                      </span>
                    </div>

                    <p className="notification-message">
                      {notification.message}
                    </p>

                    <div className="notification-meta">
                      <span className={`type-badge ${notification.type}`}>
                        {getTypeBadge(notification.type)}
                      </span>
                      <span className="category-badge">
                        {getCategoryName(notification.category)}
                      </span>
                    </div>
                  </div>

                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="action-btn mark-read"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Icon name="check" />
                      </button>
                    )}
                    <button
                      className="action-btn delete"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-notifications">
              <div className="no-notifications-icon">🔔</div>
              <h3>No notifications</h3>
              <p>
                {activeFilter === "unread"
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          )}
        </div>

        {/* Notifications Footer */}
        <div className="notifications-footer">
          <div className="notifications-stats">
            <span className="stat">
              Total: <strong>{notifications.length}</strong>
            </span>
            <span className="stat">
              Unread: <strong>{unreadCount}</strong>
            </span>
          </div>
          <button className="settings-btn">
            <Icon name="settings" />
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
