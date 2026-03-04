import React, { useState, useEffect } from "react";
import "../styles/search.css";

const Icon = ({ name }) => {
  const icons = {
    close: "✕",
    search: "🔍",
    user: "👤",
    report: "📊",
    event: "📅",
    dashboard: "📈",
    arrow: "↗"
  };

  return <span className="icon">{icons[name]}</span>;
};

const SearchModal = ({ isOpen, onClose, searchData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    reports: [],
    events: []
  });
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults({ users: [], reports: [], events: [] });
      return;
    }

    const term = searchTerm.toLowerCase();

    const userResults = searchData.users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      )
      .slice(0, 5); // En fazla 5 sonuç

    const reportResults = searchData.reports
      .filter(
        (report) =>
          report.title.toLowerCase().includes(term) ||
          report.description.toLowerCase().includes(term) ||
          report.type.toLowerCase().includes(term) ||
          report.author.toLowerCase().includes(term)
      )
      .slice(0, 5);

    const eventResults = searchData.events
      .filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.type.toLowerCase().includes(term)
      )
      .slice(0, 5);

    setSearchResults({
      users: userResults,
      reports: reportResults,
      events: eventResults
    });
  }, [searchTerm, searchData]);

  const handleResultClick = (type, item) => {
    console.log(`Navigating to ${type}:`, item);
    onClose();
    setSearchTerm("");

    // Gerçek uygulamada burada navigation yapılacak
    // Örneğin: navigate(`/${type}/${item.id}`)
  };

  const allResults = [
    ...searchResults.users.map((item) => ({ ...item, type: "users" })),
    ...searchResults.reports.map((item) => ({ ...item, type: "reports" })),
    ...searchResults.events.map((item) => ({ ...item, type: "events" }))
  ];

  const filteredResults =
    activeCategory === "all"
      ? allResults
      : allResults.filter((item) => item.type === activeCategory);

  const getItemIcon = (type) => {
    switch (type) {
      case "users":
        return <Icon name="user" />;
      case "reports":
        return <Icon name="report" />;
      case "events":
        return <Icon name="event" />;
      default:
        return <Icon name="search" />;
    }
  };

  const getCategoryName = (type) => {
    switch (type) {
      case "users":
        return "Users";
      case "reports":
        return "Reports";
      case "events":
        return "Events";
      default:
        return "All";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-container">
            <Icon name="search" />
            <input
              type="text"
              placeholder="Search users, reports, events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-modal-input"
              autoFocus
            />
            <button className="close-search-btn" onClick={onClose}>
              <Icon name="close" />
            </button>
          </div>
        </div>

        {searchTerm && (
          <div className="search-results">
            {/* Kategori Filtreleri */}
            <div className="search-categories">
              <button
                className={`category-btn ${
                  activeCategory === "all" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              <button
                className={`category-btn ${
                  activeCategory === "users" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("users")}
              >
                <Icon name="user" /> Users ({searchResults.users.length})
              </button>
              <button
                className={`category-btn ${
                  activeCategory === "reports" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("reports")}
              >
                <Icon name="report" /> Reports ({searchResults.reports.length})
              </button>
              <button
                className={`category-btn ${
                  activeCategory === "events" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("events")}
              >
                <Icon name="event" /> Events ({searchResults.events.length})
              </button>
            </div>

            {/* Arama Sonuçları */}
            <div className="results-container">
              {filteredResults.length > 0 ? (
                <div className="results-list">
                  {filteredResults.map((item, index) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="search-result-item"
                      onClick={() => handleResultClick(item.type, item)}
                    >
                      <div className="result-icon">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="result-content">
                        <div className="result-title">
                          {item.title || item.name}
                        </div>
                        <div className="result-meta">
                          <span className="result-type">
                            {getCategoryName(item.type)}
                          </span>
                          {item.email && (
                            <span className="result-email">{item.email}</span>
                          )}
                          {item.author && (
                            <span className="result-author">
                              by {item.author}
                            </span>
                          )}
                          {item.date && (
                            <span className="result-date">{item.date}</span>
                          )}
                        </div>
                        {item.description && (
                          <div className="result-description">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <div className="result-arrow">
                        <Icon name="arrow" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No results found</h3>
                  <p>Try searching for users, reports, or events</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {searchTerm && (
              <div className="search-stats">
                <div className="stat-item">
                  <span className="stat-number">
                    {searchResults.users.length}
                  </span>
                  <span className="stat-label">Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {searchResults.reports.length}
                  </span>
                  <span className="stat-label">Reports</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {searchResults.events.length}
                  </span>
                  <span className="stat-label">Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{allResults.length}</span>
                  <span className="stat-label">Total</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="search-placeholder">
            <div className="placeholder-icon">🔍</div>
            <h3>Global Search</h3>
            <p>Search across users, reports, and events</p>
            <div className="search-tips">
              <div className="tip-item">
                <strong>Tip:</strong> Try searching by name, email, or title
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
