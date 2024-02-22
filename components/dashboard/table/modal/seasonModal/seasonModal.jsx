"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SeasonModal = ({ closeModal }) => {
  // State for form data
  const [seasonData, setSeasonData] = useState({
    season: '',
    description: '',
    selectedShow: '',
    isEpisode: [],
  });

  // State for show names and IDs fetched from the API
  const [showNames, setShowNames] = useState([]);
  const [showId, setShowId] = useState(null);
  const [getInsertedId, setInsertedId] = useState(null)
  console.log(getInsertedId)
  // Effect to fetch show names and IDs from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/shows');
        const shows = response.data;

        setShowNames(shows);
      } catch (error) {
        console.error('Failed to fetch show names:', error.message);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Log the selected value and its associated _id
    const selectedShow = showNames.find((show) => show.showName === value);
    if (selectedShow) {
      setShowId(selectedShow._id);
      console.log('Selected Show:', selectedShow.showName);
      console.log('Selected Show ID:', selectedShow._id);
    }

    setSeasonData({
      ...seasonData,
      [name]: value,
    });
  };

  // Handle save button click

  const handleSave = async () => {
    try {
      // Save the season
      const response = await axios.post('https://endgame-team-server.vercel.app/seasons', seasonData);
      const insertedId = response?.data.insertedId; // Corrected this line
      setInsertedId(insertedId);

      if (response.status === 200) {
        const { acknowledged } = response.data;

        toast.success(`Season saved successfully! Acknowledged: ${acknowledged}, Inserted ID: ${insertedId}`, {
          autoClose: 5000,
        });

        // Update the corresponding show data with the new season ID
        const showResponse = await axios.put(`https://endgame-team-server.vercel.app/shows/${showId}/seasons`, {
          seasonId: insertedId,
        });

        if (showResponse.status === 200) {
          console.log('Show updated successfully:', showResponse.data);
          // Further logic to update your show data, e.g., updating the state
          // setYourShowData(showResponse.data);
        } else {
          console.error('Failed to update show with new season ID:', showResponse.status, showResponse.statusText);
          toast.error('Failed to update show. Please try again.');
        }

        // closeModal(); // Close the modal after success
      } else {
        console.error('Failed to save season:', response.status, response.statusText);
        toast.error('Failed to save season. Please try again.');
      }
    } catch (error) {
      console.error('Error saving season:', error.message);
      toast.error('Error saving season. Please try again.');
    }
  };


  return (
    <div>
      <div className="flex items-center justify-center p-2 bg-slate-900 bg-opacity-50">
        <div className="p-2 w-full">
          <form action="">
            <fieldset className="border p-2">
              <legend>Seasons</legend>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Seasons:</label>
                <input
                  type="text"
                  name="season"
                  value={seasonData.season}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  placeholder="Enter season name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={seasonData.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Show Name:</label>
                <select
                  name="selectedShow"
                  value={seasonData.selectedShow}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border bg-slate-800 rounded w-full"
                >
                  {showNames.map((show) => (
                    <option key={show._id} value={show.showName}>
                      {show.showName} = {show._id}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </form>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-4">
            Save
          </button>
          <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded mt-2">
            Close Modal
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SeasonModal;
