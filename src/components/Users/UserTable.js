import React, { useState } from "react";

const Icon = ({ name }) => {
  const icons = {
    edit: "✏️",
    delete: "🗑️",
    view: "👁️",
    admin: "👑",
    manager: "💼",
    user: "👤",
    active: "🟢",
    inactive: "🔴",
    search: "🔍",
    filter: "⚡"
  };

  return <span className="icon">{icons[name]}</span>;
};

const UserTable = ({ users, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const usersPerPage = 5;

  // Filtreleme
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sayfalama
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <Icon name="admin" />;
      case "Manager":
        return <Icon name="manager" />;
      default:
        return <Icon name="user" />;
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <span className="status-badge active">
        <Icon name="active" /> Active
      </span>
    ) : (
      <span className="status-badge inactive">
        <Icon name="inactive" /> Inactive
      </span>
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
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
    <div className="user-table-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Icon name="filter" />
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="role-filter"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>
          Showing {currentUsers.length} of {filteredUsers.length} users
          {searchTerm && ` for "${searchTerm}"`}
          {(roleFilter !== "All" || statusFilter !== "All") && " with filters"}
        </span>
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="user-row">
                  <td className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name" title={user.name}>
                        {user.name}
                      </div>
                      <div className="user-email" title={user.email}>
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-badge">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td className="last-login">{user.lastLogin}</td>
                  <td className="created-date">{user.createdAt}</td>
                  <td className="actions">
                    <button
                      className="btn-view"
                      onClick={() => onView(user)}
                      title="View User Details"
                    >
                      <Icon name="view" />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(user)}
                      title="Edit User"
                    >
                      <Icon name="edit" />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(user.id)}
                      title="Delete User"
                    >
                      <Icon name="delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">👤</div>
                    <h3>No users found</h3>
                    <p>
                      {searchTerm ||
                      roleFilter !== "All" ||
                      statusFilter !== "All"
                        ? "Try adjusting your search or filters"
                        : "No users available. Add your first user!"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default UserTable;
