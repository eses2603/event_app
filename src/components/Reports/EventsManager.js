import React, { useState } from "react";

const Icon = ({ name }) => {
  const icons = {
    edit: "✏️",
    delete: "🗑️",
    view: "👁️",
    meeting: "🤝",
    webinar: "🎥",
    conference: "🌐",
    workshop: "🔧",
    training: "🎓",
    scheduled: "🟢",
    confirmed: "🔵",
    cancelled: "🔴",
    calendar: "📅",
    time: "⏰",
    participants: "👥",
    search: "🔍",
    filter: "⚡"
  };

  return <span className="icon">{icons[name]}</span>;
};

const EventsManager = ({ events, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const eventsPerPage = 6;

  // Filtreleme
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || event.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sayfalama
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="events-manager-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Icon name="filter" />
            <select
              value={typeFilter}
              onChange={handleTypeFilterChange}
              className="type-filter"
            >
              <option value="All">All Types</option>
              <option value="Meeting">Meeting</option>
              <option value="Webinar">Webinar</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Training">Training</option>
            </select>
          </div>

          <div className="filter-group">
            <Icon name="filter" />
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="status-filter"
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          Showing {currentEvents.length} of {filteredEvents.length} events
          {searchTerm && ` for "${searchTerm}"`}
          {(typeFilter !== "All" || statusFilter !== "All") && " with filters"}
        </span>
      </div>

      <div className="events-grid">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="event-type">
                  {getTypeIcon(event.type)}
                  <span>{event.type}</span>
                </div>
                {getStatusBadge(event.status)}
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="detail-item">
                    <Icon name="calendar" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="detail-item">
                    <Icon name="time" />
                    <span>{event.time}</span>
                  </div>
                  <div className="detail-item">
                    <Icon name="participants" />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
              </div>

              <div className="event-actions">
                <button
                  className="btn-view"
                  onClick={() => onView(event)}
                  title="View Event Details"
                >
                  <Icon name="view" /> Details
                </button>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(event)}
                  title="Edit Event"
                >
                  <Icon name="edit" /> Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(event.id)}
                  title="Delete Event"
                >
                  <Icon name="delete" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <div className="no-data-icon">📅</div>
            <h3>No Events Found</h3>
            <p>
              {searchTerm || typeFilter !== "All" || statusFilter !== "All"
                ? "Try adjusting your search or filters"
                : "No events available. Schedule your first event!"}
            </p>
          </div>
        )}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-btn prev"
          >
            Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-btn next"
          >
            Next
          </button>

          <div className="page-info">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
