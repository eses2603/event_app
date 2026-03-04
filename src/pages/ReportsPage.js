import React, { useState, useEffect } from "react";
import ReportList from "../components/Reports/ReportList";
import ReportForm from "../components/Reports/ReportForm";
import EventsManager from "../components/Reports/EventsManager";
import ReportDetail from "../components/Reports/ReportDetail"; // YENİ
import EventDetail from "../components/Reports/EventDetail"; // YENİ
import { localStorageService } from "../services/localStorage"; // YENİ
import "../styles/reports.css";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [reports, setReports] = useState([]);
  const [events, setEvents] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null); // YENİ
  const [selectedEvent, setSelectedEvent] = useState(null); // YENİ
  const [showReportDetail, setShowReportDetail] = useState(false); // YENİ
  const [showEventDetail, setShowEventDetail] = useState(false); // YENİ

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      localStorageService.initializeData();
      const reportsData = localStorageService.getReports();
      const eventsData = localStorageService.getEvents();
      setReports(reportsData);
      setEvents(eventsData);
    };

    loadData();
  }, []);

  const saveReports = (updatedReports) => {
    const success = localStorageService.saveReports(updatedReports);
    if (success) {
      setReports(updatedReports);
    }
    return success;
  };

  const saveEvents = (updatedEvents) => {
    const success = localStorageService.saveEvents(updatedEvents);
    if (success) {
      setEvents(updatedEvents);
    }
    return success;
  };

  // Report CRUD Operations
  const handleAddReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      ...reportData,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      views: 0,
      author: "Current User"
    };

    const updatedReports = [...reports, newReport];
    const success = saveReports(updatedReports);

    if (success) {
      setShowReportForm(false);
    }
  };

  const handleEditReport = (reportData) => {
    const updatedReports = reports.map((report) =>
      report.id === editingReport.id
        ? {
            ...report,
            ...reportData,
            updatedAt: new Date().toISOString().split("T")[0]
          }
        : report
    );

    const success = saveReports(updatedReports);

    if (success) {
      setEditingReport(null);
      setShowReportForm(false);
    }
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((report) => report.id !== reportId);
      saveReports(updatedReports);
    }
  };

  const handleViewReport = (report) => {
    // YENİ
    setSelectedReport(report);
    setShowReportDetail(true);
  };

  // Event CRUD Operations
  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData
    };

    const updatedEvents = [...events, newEvent];
    const success = saveEvents(updatedEvents);

    if (success) {
      setShowEventForm(false);
    }
  };

  const handleEditEvent = (eventData) => {
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? { ...event, ...eventData } : event
    );

    const success = saveEvents(updatedEvents);

    if (success) {
      setEditingEvent(null);
      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((event) => event.id !== eventId);
      saveEvents(updatedEvents);
    }
  };

  const handleViewEvent = (event) => {
    // YENİ
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>📋 Report Management</h1>
        <p>Manage reports, analytics, and events</p>
      </div>

      <div className="reports-content">
        {/* Tab Navigation */}
        <div className="tabs-navigation">
          <button
            className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            📊 Reports
          </button>
          <button
            className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            📅 Events
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "reports" && (
            <div className="reports-tab">
              <div className="section-header">
                <div className="header-info">
                  <h2>Reports & Analytics</h2>
                  <p>Create and manage system reports</p>
                </div>
                <div className="header-actions">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setEditingReport(null);
                      setShowReportForm(true);
                    }}
                  >
                    + New Report
                  </button>
                </div>
              </div>

              <ReportList
                reports={reports}
                onEdit={(report) => {
                  setEditingReport(report);
                  setShowReportForm(true);
                }}
                onDelete={handleDeleteReport}
                onView={handleViewReport} // YENİ
              />

              {showReportForm && (
                <ReportForm
                  report={editingReport}
                  onSave={editingReport ? handleEditReport : handleAddReport}
                  onCancel={() => {
                    setShowReportForm(false);
                    setEditingReport(null);
                  }}
                />
              )}

              {showReportDetail &&
                selectedReport && ( // YENİ
                  <ReportDetail
                    report={selectedReport}
                    onClose={() => {
                      setShowReportDetail(false);
                      setSelectedReport(null);
                    }}
                    onEdit={() => {
                      setShowReportDetail(false);
                      setEditingReport(selectedReport);
                      setShowReportForm(true);
                    }}
                  />
                )}
            </div>
          )}

          {activeTab === "events" && (
            <div className="events-tab">
              <div className="section-header">
                <div className="header-info">
                  <h2>Event Management</h2>
                  <p>Schedule and manage system events</p>
                </div>
                <div className="header-actions">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setEditingEvent(null);
                      setShowEventForm(true);
                    }}
                  >
                    + New Event
                  </button>
                </div>
              </div>

              <EventsManager
                events={events}
                onEdit={(event) => {
                  setEditingEvent(event);
                  setShowEventForm(true);
                }}
                onDelete={handleDeleteEvent}
                onView={handleViewEvent} // YENİ
              />

              {showEventForm && (
                <ReportForm
                  event={editingEvent}
                  onSave={editingEvent ? handleEditEvent : handleAddEvent}
                  onCancel={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                  }}
                  isEvent={true}
                />
              )}

              {showEventDetail &&
                selectedEvent && ( // YENİ
                  <EventDetail
                    event={selectedEvent}
                    onClose={() => {
                      setShowEventDetail(false);
                      setSelectedEvent(null);
                    }}
                    onEdit={() => {
                      setShowEventDetail(false);
                      setEditingEvent(selectedEvent);
                      setShowEventForm(true);
                    }}
                  />
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
