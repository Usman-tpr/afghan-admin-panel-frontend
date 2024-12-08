import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getData, postData, deleteData, updateData } from "../api/api";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // To track editing state
  const [formData, setFormData] = useState({
    image: null,
    title_english: "",
    title_parsi: "",
    title_pashto: "",
    description_english: "",
    description_parsi: "",
    description_pashto: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#1a202c"; // bg-gray-950
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getData("event/"); // Assuming endpoint is 'event/'
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (isEditing) {
        await updateData(`event/${isEditing}`, formDataToSend);
        toast.success("Event updated successfully!");
        setIsEditing(null);
      } else {
        await postData("event/", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event added successfully!");
      }
      setIsModalOpen(false);
      setImagePreview(null);

      fetchEvents();
    } catch (error) {
      toast.error("An error occurred!");
      console.error(error);
    }
  };

  const handleEditEvent = (event) => {
    setIsEditing(event._id);
    setFormData({
      ...event,
      image: event.image, // Reset image field for editing
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteData(`/event/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete event!");
      console.error(error);
    }
  };

  return (
    <div className="text-white bg-gray-950">
      <ToastContainer />
      <div className="flex justify-between p-6">
        <h2 className="text-2xl font-semibold mb-4">Events Page</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setFormData({
              image: null,
              title_english: "",
              title_parsi: "",
              title_pashto: "",
              description_english: "",
              description_parsi: "",
              description_pashto: "",
            });
            setIsEditing(null);
          }}
          className="bg-yellow-500 text-black text-xl font-semibold px-10 py-2 rounded hover:bg-yellow-600 transition"
        >
          Add Event
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={`https://api.afghan.ayancurtains.com/${event.image}`}
              alt={event.title_english}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{event.title_english}</h3>
            <h3 className="text-lg font-semibold">{event.title_parsi}</h3>
            <h3 className="text-lg font-semibold">{event.title_pashto}</h3>
            <p className="text-gray-400 mt-2">{event.description_english}</p>
            <p className="text-gray-400 mt-2">{event.description_parsi}</p>
            <p className="text-gray-400 mt-2">{event.description_pashto}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEditEvent(event)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex items-center"
              >
                <AiOutlineEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center"
              >
                <AiOutlineDelete className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed overflow-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 mt-7">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input fields */}
              {Object.keys(formData).map((key) =>
                key !== "image" ? (
                  <div key={key}>
                    <label className="block font-medium mb-1">
                      {key.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      type={key.includes("date") ? "date" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                ) : (
                  <div key={key}>
                    <label className="block font-medium mb-1">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 h-32 w-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                )
              )}
              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  {isEditing ? "Update" : "Submit"}
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
    </div>
  );
};

export default EventPage;
