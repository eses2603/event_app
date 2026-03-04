import React from "react";

const Icon = ({ name }) => {
  const icons = {
    close: "✕",
    edit: "✏️",
    user: "👤",
    email: "📧",
    role: "🎯",
    status: "🟢",
    calendar: "📅",
    back: "←"
  };

  return <span className="icon">{icons[name]}</span>;
};

const UserDetail = ({ user, onClose, onEdit }) => {
  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <span className="status-badge active">
        <Icon name="status" /> Active
      </span>
    ) : (
      <span className="status-badge inactive">
        <Icon name="status" /> Inactive
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      Admin: { color: "#ffc107", bg: "rgba(255, 193, 7, 0.2)" },
      Manager: { color: "#4361ee", bg: "rgba(67, 97, 238, 0.2)" },
      User: { color: "#6c757d", bg: "rgba(108, 117, 125, 0.2)" }
    };

    const config = roleConfig[role] || roleConfig.User;

    return (
      <span
        className="role-badge"
        style={{
          color: config.color,
          backgroundColor: config.bg
        }}
      >
        <Icon name="role" /> {role}
      </span>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="user-detail-modal">
        <div className="modal-header">
          <div className="header-title">
            <Icon name="user" />
            <h2>User Details</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="user-detail-content">
          <div className="user-profile-header">
            <div className="user-avatar-large">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="user-basic-info">
              <h1 className="user-name">{user.name}</h1>
              <div className="user-meta">
                {getStatusBadge(user.status)}
                {getRoleBadge(user.role)}
              </div>
            </div>
          </div>

          <div className="user-detail-sections">
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="email" />
                  <div className="detail-content">
                    <label>Email Address</label>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Account Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="role" />
                  <div className="detail-content">
                    <label>Role</label>
                    <span>{user.role}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="status" />
                  <div className="detail-content">
                    <label>Status</label>
                    <span>{user.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Activity</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="calendar" />
                  <div className="detail-content">
                    <label>Member Since</label>
                    <span>{user.createdAt}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="calendar" />
                  <div className="detail-content">
                    <label>Last Login</label>
                    <span>{user.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            <Icon name="back" /> Back to List
          </button>
          <button className="btn-primary" onClick={onEdit}>
            <Icon name="edit" /> Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
