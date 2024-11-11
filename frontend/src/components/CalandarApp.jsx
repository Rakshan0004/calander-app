import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import axios from "axios";

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    date: "",
    text: "",
    image: null,
    video: null,
  });
  const [events, setEvents] = useState([]);

  // Fetch events from backend on component load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle date click and open modal for event creation
  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    setEventDetails({ ...eventDetails, date: selectedDate.toISOString() });
    setIsModalOpen(true);
  };

  // Handle event creation
  const handleEventCreate = async () => {
    const formData = new FormData();
    formData.append("date", eventDetails.date);
    formData.append("text", eventDetails.text);
    if (eventDetails.image) formData.append("image", eventDetails.image);
    if (eventDetails.video) formData.append("video", eventDetails.video);

    try {
      await axios.post("http://localhost:3000/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event Created");
      setIsModalOpen(false);
      setEventDetails({ date: "", text: "", image: null, video: null });
      // Refresh events
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleTextChange = (e) =>
    setEventDetails({ ...eventDetails, text: e.target.value });
  const handleImageChange = (e) =>
    setEventDetails({ ...eventDetails, image: e.target.files[0] });
  const handleVideoChange = (e) =>
    setEventDetails({ ...eventDetails, video: e.target.files[0] });

  // Display event details on each date
  const tileContent = ({ date, view }) => {
    const event = events.find(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    return event ? <div>{event.text}</div> : null;
  };

  return (
    <div>
      <h2>Calendar App</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={date}
        tileContent={tileContent}
      />

      {/* Modal for creating events */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Create Event on {date.toDateString()}</h2>
        <div>
          <textarea
            placeholder="Event Description"
            onChange={handleTextChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>
        <button onClick={handleEventCreate}>Create Event</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CalendarApp;
