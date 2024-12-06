import React, { useState, useEffect } from "react";
import { getData, postData, deleteData } from "../api/api";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title_en: "",
    title_per: "",
    description_en: "",
    description_per: "",
    date_en: "",
    date_per: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getData("/event");
      setEvents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file, // Set the image to the selected file
      }));
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await postData("/event", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },

      });
      setIsModalOpen(false);
      fetchEvents()
    } catch (error) {
      console.error("Error adding event", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteData(`/event/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Event Page</h2>
        <button
          className="bg-blue-950 text-white px-10 font-semibold text-xl py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>
      </div>

      {/* Modal for adding an event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Title (English)</label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Title (Persian)</label>
                <input
                  type="text"
                  name="title_per"
                  value={formData.title_per}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description (English)</label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description (Persian)</label>
                <textarea
                  name="description_per"
                  value={formData.description_per}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date (English)</label>
                <input
                  type="date"
                  name="date_en"
                  value={formData.date_en}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Date (Persian)</label>
                <input
                  type="date"
                  name="date_per"
                  value={formData.date_per}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Displaying events as cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={`http://localhost:5000/${event.image}`}
              alt={event.title_en}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{event.title_en}</h3>
            <p className="text-gray-600 mt-2">{event.description_en}</p>
            <button
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={() => handleDeleteEvent(event._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
