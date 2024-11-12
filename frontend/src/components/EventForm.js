import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ event, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (event) {
      // If an event is passed, we're editing it
      setTitle(event.title);
      setDate(event.date);
      setDescription(event.description);
      setImageUrl(event.imageUrl);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      date,
      description,
      imageUrl,
    };

    if (event) {
      // Update event if editing
      try {
        await axios.put(`http://localhost:3000/events/${event.id}`, eventData);
        onSave();  // Notify parent component that save is done
      } catch (error) {
        console.error('Error updating event:', error);
      }
    } else {
      // Create a new event
      try {
        await axios.post('http://localhost:3000/events', eventData);
        onSave();  // Notify parent component that save is done
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Date</label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit">{event ? 'Save Changes' : 'Create Event'}</button>
    </form>
  );
};

export default EventForm;
