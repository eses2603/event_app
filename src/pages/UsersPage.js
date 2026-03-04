import React, { useState, useEffect } from "react";
import UserTable from "../components/Users/UserTable";
import UserForm from "../components/Users/UserForm";
import UserDetail from "../components/Users/UserDetail";
import { localStorageService } from "../services/localStorage";
import "../styles/users.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage on component mount
  useEffect(() => {
    const loadUsers = () => {
      setLoading(true);
      // Initialize sample data if empty
      localStorageService.initializeData();

      const usersData = localStorageService.getUsers();
      setUsers(usersData);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const saveUsers = (updatedUsers) => {
    const success = localStorageService.saveUsers(updatedUsers);
    if (success) {
      setUsers(updatedUsers);
    }
    return success;
  };

  const handleAddUser = (userData) => {
    const newUser = {
      id: Date.now(), // Simple ID generation
      ...userData,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      avatar: null
    };

    const updatedUsers = [...users, newUser];
    const success = saveUsers(updatedUsers);

    if (success) {
      setShowUserForm(false);
    } else {
      alert("Error saving user. Please try again.");
    }
  };

  const handleEditUser = (userData) => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            ...userData,
            updatedAt: new Date().toISOString().split("T")[0]
          }
        : user
    );

    const success = saveUsers(updatedUsers);

    if (success) {
      setEditingUser(null);
      setShowUserForm(false);
    } else {
      alert("Error updating user. Please try again.");
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      const success = saveUsers(updatedUsers);

      if (!success) {
        alert("Error deleting user. Please try again.");
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleCloseDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="page-header">
          <h1>👥 User Management</h1>
          <p>Manage system users and their permissions</p>
        </div>
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>👥 User Management</h1>
        <p>Manage system users and their permissions</p>
      </div>

      <div className="users-content">
        <div className="users-header">
          <div className="header-actions">
            <button
              className="btn-primary"
              onClick={() => {
                setEditingUser(null);
                setShowUserForm(true);
              }}
            >
              + Add New User
            </button>
          </div>
        </div>

        <UserTable
          users={users}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
          onView={handleViewClick}
        />

        {showUserForm && (
          <UserForm
            user={editingUser}
            onSave={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => {
              setShowUserForm(false);
              setEditingUser(null);
            }}
          />
        )}

        {showUserDetail && selectedUser && (
          <UserDetail
            user={selectedUser}
            onClose={handleCloseDetail}
            onEdit={() => {
              setShowUserDetail(false);
              setEditingUser(selectedUser);
              setShowUserForm(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
