// src/components/EventItem.js
import React from 'react';

const EventItem = ({ event, onDelete, onEdit }) => {
return (
    <li>
    <div>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>{event.date}</p>
        <button onClick={() => onEdit(event)}>Edit</button>
        <button onClick={() => onDelete(event.id)}>Delete</button>
    </div>
    </li>
);
};

export default EventItem;
