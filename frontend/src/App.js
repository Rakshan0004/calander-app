import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="App">
      <h1>Calendar App</h1>
      <EventForm onEventCreated={handleEventCreated} />
      <EventList events={events} />
    </div>
  );
}

export default App;
