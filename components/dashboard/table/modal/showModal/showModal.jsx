"use client"
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const ShowModal = ({ closeModal }) => {
  const [showData, setShowData] = useState({
    showName: '',
    description: '',
    showAccess: 'Free',
    language: 'Bangla',
    genres: 'Action',
    releaseDate: '',
    publicDate: '',
    duration: '',
    seasons: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Show Info:', showData);
  
      const response = await axios.post('https://endgame-team-server.vercel.app/shows', showData);
  
      if (response.status === 200) {
        console.log('Show saved successfully:', response.data);
  
        // Access the properties from the response and include them in the toast
        const { acknowledged, insertedId } = response.data;
  
        toast.success(`show saved successfully! Acknowledged: ${acknowledged}, Inserted ID: ${insertedId}`, {
          autoClose: 5000, // Set the duration in milliseconds (e.g., 5000ms or 5 seconds)
          // Other toast options can be set here
        });
        
        // closeModal(); // Close the modal after success
      } else {
        console.error('Failed to save show:', response.status, response.statusText);
        toast.error('Failed to save show. Please try again.');
      }
      
    } catch (error) {
      console.error('Error saving show:', error.message);
      toast.error('Error saving show. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-2 bg-slate-900 bg-opacity-50">
        <div className="w-full p-6">
          <form>
            <fieldset className="border p-6 mb-4">
              <legend>Show</legend>
              <div className="">
                <label className="block text-sm font-medium text-gray-600">Show Name:</label>
                <input
                  type="text"
                  name="showName"
                  value={showData.showName}
                  onChange={handleChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  placeholder="Enter Show Name"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600">Description:</label>
                <textarea
                  name="description"
                  value={showData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  placeholder="Description"
                />
              </div>

              <div className="flex mb-4 gap-4 flex-col lg:flex-row justify-between items-center">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600">Movie Access:</label>
                  <select
                    name="showAccess"
                    id="showAccess"
                    className="mt-1 p-2 border bg-slate-800 rounded w-full"
                    value={showData.showAccess}
                    onChange={handleChange}
                  >
                    <option value="Free">Free</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600">Language:</label>
                  <select
                    name="language"
                    id="language"
                    className="mt-1 p-2 border bg-slate-800 rounded w-full"
                    value={showData.language}
                    onChange={handleChange}
                  >
                    <option value="Bangla">Bangla</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="China">China</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Genres:</label>
                <select
                  name="genres"
                  id="genres"
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  value={showData.genres}
                  onChange={handleChange}
                >
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </fieldset>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
              <div className="">
                <label htmlFor="releaseDate" className="text-sm block font-semibold text-gray-600">
                  Release Date
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={showData.releaseDate}
                  onChange={handleChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                />
              </div>

              <div className="">
                <label htmlFor="publicDate" className="text-sm block font-semibold text-gray-600">
                  Public Date
                </label>
                <input
                  type="date"
                  id="publicDate"
                  name="publicDate"
                  value={showData.publicDate}
                  onChange={handleChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                />
              </div>
              <div className="">
                <label htmlFor="duration" className="text-sm block font-semibold text-gray-600">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={showData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration (e.g., 120 minutes)"
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                />
              </div>
            </div>

            <div className="flex justify-between text-sm lg:text-lg gap-x-2 py-2">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save
              </button>

              <div className="">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default ShowModal;
