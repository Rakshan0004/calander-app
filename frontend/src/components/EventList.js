// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

const EventList = () => {
const [events, setEvents] = useState([]);
const [editingEvent, setEditingEvent] = useState(null);

useEffect(() => {
    axios.get('http://localhost:3000/events').then((response) => setEvents(response.data));
}, []);

const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/events/${id}`).then(() => {
    setEvents(events.filter((event) => event.id !== id));
    });
};

const handleSave = () => {
    axios.get('http://localhost:3000/events').then((response) => setEvents(response.data));
    setEditingEvent(null);
};

const handleEdit = (event) => {
    setEditingEvent(event);
};

return (
    <div>
    <h1>Event List</h1>
    {editingEvent ? (
        <EventForm event={editingEvent} onSave={handleSave} />
    ) : (
        <EventForm onSave={handleSave} />
    )}

    <ul>
        {events.map((event) => (
        <li key={event.id}>
            <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
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
