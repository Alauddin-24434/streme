import React from 'react';

import BodyChildren from './BodyChildren/BodyChildren';

const ChildrenBox = ({ dbutton, tableData,onDelete,onCurrentVisibleStatus ,searchQuery,setSearchQuery,  fetchEpisodes, fetchMovies,fetchShows}) => {
    return (
        <div className="border border-black p-3   min-h-screen">
          
            <BodyChildren dbutton={dbutton}   fetchEpisodes={fetchEpisodes}  fetchMovies={fetchMovies} fetchShows={fetchShows} searchQuery={searchQuery} setSearchQuery={setSearchQuery} tableData={tableData} onDelete={onDelete} onCurrentVisibleStatus={onCurrentVisibleStatus}  />
        </div>
    );
};

export default ChildrenBox;