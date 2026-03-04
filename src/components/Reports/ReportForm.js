import React, { useState, useEffect } from "react";

const ReportForm = ({ report, event, onSave, onCancel, isEvent = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: isEvent ? "Meeting" : "Performance",
    status: isEvent ? "Scheduled" : "Draft"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (report || event) {
      const data = report || event;
      setFormData({
        title: data.title || "",
        description: data.description || "",
        type: data.type || (isEvent ? "Meeting" : "Performance"),
        status: data.status || (isEvent ? "Scheduled" : "Draft"),
        // Event-specific fields
        ...(isEvent && {
          date: data.date || "",
          time: data.time || "",
          participants: data.participants || 0
        })
      });
    }
  }, [report, event, isEvent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (isEvent) {
      if (!formData.date) {
        newErrors.date = "Date is required";
      }
      if (!formData.time) {
        newErrors.time = "Time is required";
      }
      if (!formData.participants || formData.participants < 0) {
        newErrors.participants = "Valid number of participants is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const reportTypes = [
    { value: "Performance", label: "Performance Report" },
    { value: "Analytics", label: "Analytics Report" },
    { value: "Technical", label: "Technical Report" },
    { value: "Financial", label: "Financial Report" }
  ];

  const eventTypes = [
    { value: "Meeting", label: "Meeting" },
    { value: "Webinar", label: "Webinar" },
    { value: "Conference", label: "Conference" },
    { value: "Workshop", label: "Workshop" },
    { value: "Training", label: "Training" }
  ];

  const reportStatuses = [
    { value: "Draft", label: "Draft" },
    { value: "Published", label: "Published" },
    { value: "Archived", label: "Archived" }
  ];

  const eventStatuses = [
    { value: "Scheduled", label: "Scheduled" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Cancelled", label: "Cancelled" }
  ];

  return (
    <div className="modal-overlay">
      <div className={`report-form-modal ${isEvent ? "event-form" : ""}`}>
        <div className="modal-header">
          <h2>
            {isEvent
              ? event
                ? "Edit Event"
                : "Create New Event"
              : report
              ? "Edit Report"
              : "Create New Report"}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "error" : ""}
              placeholder={`Enter ${isEvent ? "event" : "report"} title`}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "error" : ""}
              placeholder={`Enter ${isEvent ? "event" : "report"} description`}
              rows="3"
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {(isEvent ? eventTypes : reportTypes).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {(isEvent ? eventStatuses : reportStatuses).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Event-specific fields */}
          {isEvent && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && (
                  <span className="error-text">{errors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? "error" : ""}
                />
                {errors.time && (
                  <span className="error-text">{errors.time}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="participants">Participants *</label>
                <input
                  type="number"
                  id="participants"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  className={errors.participants ? "error" : ""}
                  min="0"
                />
                {errors.participants && (
                  <span className="error-text">{errors.participants}</span>
                )}
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {isEvent
                ? event
                  ? "Update Event"
                  : "Create Event"
                : report
                ? "Update Report"
                : "Create Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
