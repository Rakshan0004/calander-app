import axios from 'axios';

// Set the base URL for the backend (adjust port if necessary)
const BASE_URL = 'http://localhost:3000/events';

// Create Event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(BASE_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Get All Events
export const getAllEvents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
