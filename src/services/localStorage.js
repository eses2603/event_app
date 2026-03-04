const STORAGE_KEYS = {
  USERS: "didiyos_users",
  REPORTS: "didiyos_reports",
  EVENTS: "didiyos_events",
  DASHBOARD_STATS: "didiyos_dashboard_stats"
};

// Helper functions for localStorage
export const localStorageService = {
  // Users
  getUsers: () => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error getting users from localStorage:", error);
      return [];
    }
  },

  saveUsers: (users) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
      return false;
    }
  },

  // Reports
  getReports: () => {
    try {
      const reports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return reports ? JSON.parse(reports) : [];
    } catch (error) {
      console.error("Error getting reports from localStorage:", error);
      return [];
    }
  },

  saveReports: (reports) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
      return true;
    } catch (error) {
      console.error("Error saving reports to localStorage:", error);
      return false;
    }
  },

  // Events
  getEvents: () => {
    try {
      const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error("Error getting events from localStorage:", error);
      return [];
    }
  },

  saveEvents: (events) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
      return false;
    }
  },

  // Initialize with sample data if empty
  initializeData: () => {
    const existingUsers = localStorageService.getUsers();
    if (existingUsers.length === 0) {
      const sampleUsers = [
        {
          id: 1,
          name: "Ahmet Yılmaz",
          email: "ahmet@didiyos.com",
          role: "Admin",
          status: "Active",
          lastLogin: "2024-01-15 14:30",
          createdAt: "2024-01-01"
        },
        {
          id: 2,
          name: "Mehmet Demir",
          email: "mehmet@didiyos.com",
          role: "Manager",
          status: "Active",
          lastLogin: "2024-01-14 09:15",
          createdAt: "2024-01-02"
        },
        {
          id: 3,
          name: "Ayşe Kaya",
          email: "ayse@didiyos.com",
          role: "User",
          status: "Inactive",
          lastLogin: "2024-01-10 16:45",
          createdAt: "2024-01-03"
        }
      ];
      localStorageService.saveUsers(sampleUsers);
    }

    const existingReports = localStorageService.getReports();
    if (existingReports.length === 0) {
      const sampleReports = [
        {
          id: 1,
          title: "Q4 Performance Analysis",
          type: "Performance",
          status: "Published",
          author: "Ahmet Yılmaz",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-15",
          views: 124,
          description: "Quarterly performance analysis and insights",
          content: "Detailed report content would go here..."
        },
        {
          id: 2,
          title: "User Engagement Report",
          type: "Analytics",
          status: "Draft",
          author: "Mehmet Demir",
          createdAt: "2024-01-12",
          updatedAt: "2024-01-12",
          views: 0,
          description: "Monthly user engagement metrics and trends",
          content: "User engagement analysis content..."
        }
      ];
      localStorageService.saveReports(sampleReports);
    }

    const existingEvents = localStorageService.getEvents();
    if (existingEvents.length === 0) {
      const sampleEvents = [
        {
          id: 1,
          title: "Monthly Review Meeting",
          type: "Meeting",
          date: "2024-01-20",
          time: "14:00",
          participants: 15,
          status: "Scheduled",
          description: "Monthly performance review and planning",
          location: "Conference Room A"
        },
        {
          id: 2,
          title: "Product Launch Webinar",
          type: "Webinar",
          date: "2024-01-25",
          time: "16:00",
          participants: 50,
          status: "Confirmed",
          description: "New product features announcement",
          location: "Online"
        }
      ];
      localStorageService.saveEvents(sampleEvents);
    }
  }
};

export default localStorageService;
