import React from "react";

const Icon = ({ name }) => {
  const icons = {
    meeting: "🤝",
    presentation: "📊",
    deadline: "⏰",
    celebration: "🎉",
    urgent: "🚨",
    user: "👤",
    clock: "🕒",
    tag: "🏷️",
    training: "🎓",
    conference: "🌐",
    workshop: "🔧",
    review: "📝"
  };

  return <span className="icon">{icons[name]}</span>;
};

const EventsList = () => {
  const closestEvents = [
    {
      id: 1,
      title: "Team Meeting",
      time: "14:00",
      creator: "Ahmet Yılmaz",
      type: "meeting",
      description: "Weekly team sync and project updates discussion",
      tags: ["Team", "Sync", "Important"],
      urgent: false
    },
    {
      id: 2,
      title: "Product Launch",
      time: "16:30",
      creator: "Mehmet Demir",
      type: "presentation",
      description: "New feature release and demo presentation for stakeholders",
      tags: ["Launch", "Demo", "Product"],
      urgent: true
    },
    {
      id: 3,
      title: "Client Presentation",
      time: "18:00",
      creator: "Ayşe Kaya",
      type: "presentation",
      description: "Quarterly review and next phase planning with key clients",
      tags: ["Client", "Review", "Planning"],
      urgent: false
    },
    {
      id: 4,
      title: "Project Deadline",
      time: "23:59",
      creator: "Can Öztürk",
      type: "deadline",
      description: "Final submission for Q4 development milestones",
      tags: ["Deadline", "Submission", "Milestone"],
      urgent: true
    },
    {
      id: 5,
      title: "Technical Training",
      time: "10:00",
      creator: "Zeynep Şahin",
      type: "training",
      description: "Advanced React patterns and best practices workshop",
      tags: ["Training", "React", "Development"],
      urgent: false
    },
    {
      id: 6,
      title: "Quarterly Review",
      time: "15:30",
      creator: "Murat Yıldız",
      type: "review",
      description: "Q3 performance review and Q4 goal setting session",
      tags: ["Review", "Planning", "Goals"],
      urgent: false
    }
  ];

  const getEventIcon = (type, urgent) => {
    if (urgent) return "urgent";
    return type;
  };

  return (
    <div className="events-section">
      <div className="section-header">
        <h2>📅 Closest Events</h2>
        <button className="view-all-btn">View All →</button>
      </div>

      <div className="events-grid">
        {closestEvents.map((event) => (
          <div
            key={event.id}
            className={`event-card ${event.type} ${
              event.urgent ? "urgent" : ""
            }`}
          >
            <div className="event-header">
              <div className="event-title">
                <Icon
                  name={getEventIcon(event.type, event.urgent)}
                  className="event-icon"
                />
                {event.title}
              </div>
              <div className="event-time">
                <Icon name="clock" /> {event.time}
              </div>
            </div>

            <div className="event-body">
              <div className="event-creator">
                <Icon name="user" />
                Created by: {event.creator}
              </div>

              <p className="event-description">{event.description}</p>

              <div className="event-tags">
                {event.tags.map((tag, index) => (
                  <span key={index} className="event-tag">
                    <Icon name="tag" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
