"use client"
import React, { useState } from 'react';
import {
  MdVisibility,
  MdVisibilityOff,
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import MovieModal from './modal/movieModal/movieModal';
import EpisodeModal from './modal/episodeModal/episodeModal';
import ShowModal from './modal/showModal/showModal';
import SeasonModal from './modal/seasonModal/seasonModal';

const DynamicTable = ({ dbutton }) => {
  const tableHeaders = [
    'Mark',
    'Movie',
    'Quality',
    'Category',
    'Publish Date',
    'Status',
    'Season',
    'Action',
  ];

  const initialTableData = [
    {
      id: 1,
      mark: '',
      movie: 'Inception',
      quality: 'HD',
      category: 'Sci-Fi',
      publishDate: '2022-01-01',
      status: 'visible',
      season: 1,
      action: 'Edit',
    },
    {
      id: 2,
      mark: '',
      movie: 'The Dark Knight',
      quality: 'Full HD',
      category: 'Action',
      publishDate: '2022-02-15',
      status: 'hidden',
      season: 2,
      action: 'Edit',
    },
    // Add more data as needed
  ];

  const dynamicButton = [
    "Add Movie",
    "Add Show",
    "Add Season",
    "Add Episode",
  ];

  const resultButton = dynamicButton.find(data => data === dbutton);
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedAction, setSelectedAction] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Perform your search logic here, e.g., filter movies based on the searchQuery
  };

  const handleEntriesChange = (e) => {
    setEntriesToShow(parseInt(e.target.value, 10));
    // Perform any logic related to changing the number of entries to display
  };
  const handleActionClick = () => {
    console.log(`Applying action: ${selectedAction}`);
  };

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMarkClick = (rowId) => {
    const updatedTableData = tableData.map((row) => {
      if (row.id === rowId) {
        return { ...row, mark: row.mark ? '' : '✔' };
      }
      return row;
    });

    setTableData(updatedTableData);
  };

  const getModalComponent = () => {
    switch (resultButton) {
      case "Add Movie":
        return <MovieModal closeModal={handleModalClose} />;
      case "Add Show":
        return <ShowModal closeModal={handleModalClose} />;
      case "Add Season":
        return <SeasonModal closeModal={handleModalClose} />;
      case "Add Episode":
        return <EpisodeModal closeModal={handleModalClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:p-16" style={{ backgroundColor: 'var(--bgSoft)' }}>
      <div className='flex flex-col  gap-4 py-3'>
        <div className='flex flex-row  justify-between'>
          <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-2'>

            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className='border lg:p-1'
              style={{
                backgroundColor: 'var(--bgSoft)',
                color: selectedAction ? 'black' : 'gray',
              }}
            >
              <option value="" style={{ backgroundColor: 'white', color: 'gray' }}>
                No Action
              </option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
              <option value="delete">Delete</option>
            </select>

            <button className='bg-blue-500 w-24 text-white lg:py-1 px-4 rounded hover:bg-blue-700' onClick={handleActionClick}>Apply</button>
          </div>
          <div>
            <button className='bg-blue-500  text-white lg:py-1  px-4 rounded hover:bg-blue-700' onClick={handleAddButtonClick}>+{resultButton}</button>
          </div>
        </div>
        <hr />
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Show entries:</label>
            <select
              name="entriesToShow"
              className='mt-1 p-1 border bg-slate-800 rounded w-full'
              value={entriesToShow}
              onChange={handleEntriesChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className=''>
            <label className='block text-sm font-medium text-gray-600'>Search:</label>
            <input
              type='text'
              name='search'
              value={searchQuery}
              onChange={handleSearchChange}
              className='mt-1 p-1 border bg-slate-800 rounded w-40'
              placeholder='Enter search query'
            />
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && getModalComponent()}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border  border-gray-300">
          <thead className=''>
            <tr className=' w-full '>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 border-b  gap-4 border-gray-300 font-bold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr className='border' key={row.id}>
                <td
                  className={`py-2 px-4 border-b  border-gray-300 cursor-pointer ${row.mark ? 'bg-green-500 text-white' : ''
                    }`}
                  onClick={() => handleMarkClick(row.id)}
                >
                  {row.mark}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{row.movie}</td>
                <td className="py-2 px-4 border-b border-gray-300">{row.quality}</td>
                <td className="py-2 px-4 border-b border-gray-300">{row.category}</td>
                <td className="py-2 px-4 border-b border-gray-300">{row.publishDate}</td>
                <td className="py-2 px-4 border-b border-gray-300">{row.status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{row.season}</td>
                <td className="py-3 px-4 border-gray-300 flex flex-row items-center justify-center">
                  <MdVisibility className="text-green-500 cursor-pointer mr-2" />
                  <MdVisibilityOff className="text-red-500 cursor-pointer mr-2" />
                  <MdEdit className="text-blue-500 cursor-pointer mr-2" />
                  <MdDelete className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
