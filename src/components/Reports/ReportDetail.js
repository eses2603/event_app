import React from "react";

const Icon = ({ name }) => {
  const icons = {
    close: "✕",
    edit: "✏️",
    report: "📊",
    calendar: "📅",
    user: "👤",
    eye: "👀",
    performance: "📈",
    analytics: "📊",
    technical: "🔧",
    financial: "💰",
    published: "🟢",
    draft: "🟡",
    archived: "🔴"
  };

  return <span className="icon">{icons[name]}</span>;
};

const ReportDetail = ({ report, onClose, onEdit }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "Performance":
        return <Icon name="performance" />;
      case "Analytics":
        return <Icon name="analytics" />;
      case "Technical":
        return <Icon name="technical" />;
      case "Financial":
        return <Icon name="financial" />;
      default:
        return <Icon name="report" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return (
          <span className="status-badge published">
            <Icon name="published" /> Published
          </span>
        );
      case "Draft":
        return (
          <span className="status-badge draft">
            <Icon name="draft" /> Draft
          </span>
        );
      case "Archived":
        return (
          <span className="status-badge archived">
            <Icon name="archived" /> Archived
          </span>
        );
      default:
        return (
          <span className="status-badge draft">
            <Icon name="draft" /> {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="modal-overlay">
      <div className="report-detail-modal">
        <div className="modal-header">
          <div className="header-title">
            {getTypeIcon(report.type)}
            <h2>Report Details</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="report-detail-content">
          <div className="report-header-section">
            <div className="report-type-badge">
              {getTypeIcon(report.type)}
              <span>{report.type} Report</span>
            </div>
            {getStatusBadge(report.status)}
          </div>

          <h1 className="report-title-large">{report.title}</h1>
          <p className="report-description-large">{report.description}</p>

          {report.content && (
            <div className="report-content-section">
              <h3>Report Content</h3>
              <div className="report-content">{report.content}</div>
            </div>
          )}

          <div className="report-detail-sections">
            <div className="detail-section">
              <h3>Report Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="user" />
                  <div className="detail-content">
                    <label>Author</label>
                    <span>{report.author}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="calendar" />
                  <div className="detail-content">
                    <label>Created</label>
                    <span>{formatDate(report.createdAt)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="calendar" />
                  <div className="detail-content">
                    <label>Last Updated</label>
                    <span>{formatDate(report.updatedAt)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="eye" />
                  <div className="detail-content">
                    <label>Views</label>
                    <span>{report.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            ← Back to Reports
          </button>
          <button className="btn-primary" onClick={onEdit}>
            <Icon name="edit" /> Edit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
