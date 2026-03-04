import React from "react";

const Icon = ({ name }) => {
  const icons = {
    close: "✕",
    edit: "✏️",
    calendar: "📅",
    time: "⏰",
    participants: "👥",
    location: "📍",
    meeting: "🤝",
    webinar: "🎥",
    conference: "🌐",
    workshop: "🔧",
    training: "🎓",
    scheduled: "🟢",
    confirmed: "🔵",
    cancelled: "🔴"
  };

  return <span className="icon">{icons[name]}</span>;
};

const EventDetail = ({ event, onClose, onEdit }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "Meeting":
        return <Icon name="meeting" />;
      case "Webinar":
        return <Icon name="webinar" />;
      case "Conference":
        return <Icon name="conference" />;
      case "Workshop":
        return <Icon name="workshop" />;
      case "Training":
        return <Icon name="training" />;
      default:
        return <Icon name="meeting" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Scheduled":
        return (
          <span className="status-badge scheduled">
            <Icon name="scheduled" /> Scheduled
          </span>
        );
      case "Confirmed":
        return (
          <span className="status-badge confirmed">
            <Icon name="confirmed" /> Confirmed
          </span>
        );
      case "Cancelled":
        return (
          <span className="status-badge cancelled">
            <Icon name="cancelled" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="status-badge scheduled">
            <Icon name="scheduled" /> {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="modal-overlay">
      <div className="event-detail-modal">
        <div className="modal-header">
          <div className="header-title">
            {getTypeIcon(event.type)}
            <h2>Event Details</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="event-detail-content">
          <div className="event-header-section">
            <div className="event-type-badge">
              {getTypeIcon(event.type)}
              <span>{event.type}</span>
            </div>
            {getStatusBadge(event.status)}
          </div>

          <h1 className="event-title-large">{event.title}</h1>
          <p className="event-description-large">{event.description}</p>

          <div className="event-detail-sections">
            <div className="detail-section">
              <h3>Event Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="calendar" />
                  <div className="detail-content">
                    <label>Date</label>
                    <span>{formatDate(event.date)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="time" />
                  <div className="detail-content">
                    <label>Time</label>
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="participants" />
                  <div className="detail-content">
                    <label>Participants</label>
                    <span>{event.participants} people</span>
                  </div>
                </div>
                {event.location && (
                  <div className="detail-item">
                    <Icon name="location" />
                    <div className="detail-content">
                      <label>Location</label>
                      <span>{event.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>Status & Type</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Icon name="meeting" />
                  <div className="detail-content">
                    <label>Event Type</label>
                    <span>{event.type}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Icon name="scheduled" />
                  <div className="detail-content">
                    <label>Current Status</label>
                    <span>{event.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            ← Back to Events
          </button>
          <button className="btn-primary" onClick={onEdit}>
            <Icon name="edit" /> Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
