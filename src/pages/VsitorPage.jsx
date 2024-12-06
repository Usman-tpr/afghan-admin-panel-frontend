import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteData, getData, postData } from "../api/api";

const VisitorPage = () => {
  const [visits, setVisits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title_en: "",
    title_par: "",
    description_en: "",
    description_par: "",
    date_en: "",
    date_par: ""
  });

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await getData("visit/");
      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all form fields
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await postData("visit/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsModalOpen(false);
      fetchVisits(); // Refresh visits list
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  };
  const handleDeleteVisit = async (id) => {
    try {
      await deleteData(`/visit/${id}`);
      setVisits(visits.filter((visit) => visit._id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Visitor Page</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-950 text-white text-xl font-semibold px-10 py-2 rounded hover:bg-green-600 transition"
        >
          Add Visit
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {visits.map((visit) => (
          <div
            key={visit._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={`http://localhost:5000/${visit.image}`}
              alt={visit.title_en}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{visit.title_en}</h3>
            <p className="text-gray-600 mt-2">{visit.description_en}</p>
            <button
              onClick={(() => handleDeleteVisit(visit._id))}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Visit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block font-medium mb-1">Title (Parsi)</label>
                <input
                  type="text"
                  name="title_par"
                  value={formData.title_par}
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
                <label className="block font-medium mb-1">Description (Parsi)</label>
                <textarea
                  name="description_par"
                  value={formData.description_par}
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
                <label className="block font-medium mb-1">Date (Parsi)</label>
                <input
                  type="date"
                  name="date_par"
                  value={formData.date_par}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-950  text-white px-4 py-2 rounded hover:bg-green-600 transition"
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
    </div>
  );
};

export default VisitorPage;
