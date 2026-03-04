import React, { useState } from "react";

const Icon = ({ name }) => {
  const icons = {
    edit: "✏️",
    delete: "🗑️",
    view: "👁️",
    performance: "📈",
    analytics: "📊",
    technical: "🔧",
    financial: "💰",
    published: "🟢",
    draft: "🟡",
    archived: "🔴",
    calendar: "📅",
    user: "👤",
    eye: "👀"
  };

  return <span className="icon">{icons[name]}</span>;
};

const ReportList = ({ reports, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const reportsPerPage = 6;

  // Filtreleme
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sayfalama
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

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
        return <Icon name="analytics" />;
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
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="report-list-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="type-filter"
          >
            <option value="All">All Types</option>
            <option value="Performance">Performance</option>
            <option value="Analytics">Analytics</option>
            <option value="Technical">Technical</option>
            <option value="Financial">Financial</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="reports-grid">
        {currentReports.length > 0 ? (
          currentReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div className="report-type">
                  {getTypeIcon(report.type)}
                  <span>{report.type}</span>
                </div>
                {getStatusBadge(report.status)}
              </div>

              <div className="report-content">
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>

                <div className="report-meta">
                  <div className="meta-item">
                    <Icon name="user" />
                    <span>{report.author}</span>
                  </div>
                  <div className="meta-item">
                    <Icon name="calendar" />
                    <span>{formatDate(report.updatedAt)}</span>
                  </div>
                  <div className="meta-item">
                    <Icon name="eye" />
                    <span>{report.views} views</span>
                  </div>
                </div>
              </div>

              <div className="report-actions">
                <button
                  className="btn-view"
                  onClick={() => onView(report)}
                  title="View Report"
                >
                  <Icon name="view" /> View
                </button>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(report)}
                  title="Edit Report"
                >
                  <Icon name="edit" /> Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(report.id)}
                  title="Delete Report"
                >
                  <Icon name="delete" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-reports">
            <div className="no-data-icon">📊</div>
            <h3>No Reports Found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-btn"
          >
            Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportList;
