import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff,  MdDelete } from 'react-icons/md';

import ShowModal from '../../table/modal/showModal/showModal';
import EpisodeModal from '../../table/modal/episodeModal/episodeModal';
import MovieModal from '../../table/modal/movieModal/movieModal';

const BodyChildren = ({ dbutton, fetchEpisodes, fetchMovies, fetchShows, tableData, onDelete, searchQuery, onCurrentVisibleStatus, setSearchQuery }) => {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const totalPages = Math.ceil(tableData.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const currentData = tableData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Perform your search logic here
  };

  const handleEntriesChange = (e) => {
    setEntriesToShow(parseInt(e.target.value, 10));
    // Perform any logic related to changing the number of entries to display
  };

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getModalComponent = () => {
    switch (dbutton) {
      case "Add Movie":
        return <MovieModal closeModal={handleModalClose} fetchMovies={fetchMovies} />;
      case "Add Show":
        return <ShowModal closeModal={handleModalClose} fetchShows={fetchShows} />;
   
      case "Add Episode":
        return <EpisodeModal closeModal={handleModalClose} fetchEpisodes={fetchEpisodes} />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <div className="flex flex-col lg:flex-row mb-4 text-black justify-between bg-green items-center">
        {dbutton !== "Add Users" && (
          <button className='py-2 text-white border bg-[#09526C] px-4 rounded hover:bg-green-500' onClick={handleAddButtonClick}>
            +{dbutton}
          </button>
        )}
        <div className='flex flex-col lg:flex-row items-center gap-4'>
          <div className='w-full'>
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border text-white bg-[#09526C] rounded w-full lg:w-40"
              placeholder="Enter search query"
            />
          </div>
          <div className='w-full'>
            <select
              name="entriesToShow"
              className="p-2 border text-white bg-[#09526C] rounded w-full lg:w-auto"
              value={entriesToShow}
              onChange={handleEntriesChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`modal-wrapper ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className="modal-backdrop"></div>
        <div className="modal-content">
          {isModalOpen && getModalComponent()}
        </div>
      </div>
      <div className="table-container">
        <table className="min-w-full table-auto text-black border border-collapse">
          <thead>
            <tr className='text-white bg-[#09526C]'>
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:w-1/4">Name</th>
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:flex-1">Publish Date</th>
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:flex-1">Status</th>
              {tableData.some(row => row.season) && <th className="py-2 px-4 border border-gray-300 font-bold text-sm text-center lg:flex-1">Season</th>}
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:flex-1">Hidden</th>
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:flex-1">Active</th>
              <th className="py-2 px-2 border border-black font-bold text-sm text-center lg:flex-1">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-2 border border-black text-center lg:w-1/4">{row?.title ? row?.title.slice(0, 20) : row?.userName ? row?.userName.slice(0, 20) : "N/A"}</td>
                <td className="py-2 px-2 border border-black text-center lg:flex-1">{row.publisDate ? row.publisDate : "N/A"}</td>
                <td className="py-2 px-2 border border-black text-center lg:flex-1">{row.status ? row.status : "N/A"}</td>
                {row.season && <td className="py-2 px-2 border border-black text-center lg:flex-1">{row.season}</td>}
                <td className="py-2 px-2 border border-black text-center lg:flex-1">
                  {onCurrentVisibleStatus && (
                    <MdVisibilityOff
                      className="text-red-500 cursor-pointer mx-auto"
                      onClick={() => onCurrentVisibleStatus(row._id, "disable")}
                    />
                  )}
                </td>
                <td className="py-2 px-2 border border-black text-center lg:flex-1">
                  {onCurrentVisibleStatus && (
                    <MdVisibility
                      className="text-green-500 cursor-pointer mx-auto"
                      onClick={() => onCurrentVisibleStatus(row._id, "enable")}
                    />
                  )}
                </td>
                <td className="py-2 px-2 border border-black text-center lg:flex-1">
                  {onDelete && (
                    <MdDelete
                      className="text-red-500 cursor-pointer mx-auto"
                      onClick={() => onDelete(row._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      <div className="pagination-container flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-item py-2 px-4 mx-1 rounded ${currentPage === index + 1 ? 'text-white  bg-[#09526C] ' : 'text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyChildren;
