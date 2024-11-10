// src/components/EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ event, onSave }) => {
const [title, setTitle] = useState(event ? event.title : '');
const [description, setDescription] = useState(event ? event.description : '');
const [date, setDate] = useState(event ? event.date : '');

useEffect(() => {
    if (event) {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    }
}, [event]);

const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = { title, description, date };
    if (event) {
    axios.put(`http://localhost:3000/events/${event.id}`, newEvent).then(onSave);
    } else {
    axios.post('http://localhost:3000/events', newEvent).then(onSave);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
    />
    <input
        type="text"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
    />
    <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
    />
    <button type="submit">{event ? 'Update' : 'Create'} Event</button>
    </form>
);
};

export default EventForm;
