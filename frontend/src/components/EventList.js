import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch all events on load
  useEffect(() => {
    axios.get('http://localhost:3000/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Delete event
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/events/${id}`)
      .then(() => {
        setEvents(events.filter((event) => event.id !== id)); // Remove from the UI
      })
      .catch((error) => console.error('Error deleting event:', error));
  };

  // Handle event edit (sets the event to be edited)
  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  // Refresh the events after save or edit
  const handleSave = () => {
    // Refresh the events list after a successful save or edit
    axios.get('http://localhost:3000/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
    setEditingEvent(null); // Reset the editing state
  };

  return (
    <div>
      <h1>Event List</h1>
      {/* Show EventForm for creating or editing */}
      <EventForm event={editingEvent} onSave={handleSave} />

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleString()}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
