import React from 'react';
import BodyChildren from './BodyChildren/BodyChildren';

interface ChildrenBoxProps {
  dbutton: string;
  tableData: any[];
  onDelete: (id: string) => void;
  onCurrentVisibleStatus: (id: string, currentStatus: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchEpisodes?: () => void;
  fetchMovies?: () => void;
  fetchShows?: () => void;
}

const ChildrenBox: React.FC<ChildrenBoxProps> = ({
  dbutton,
  tableData,
  onDelete,
  onCurrentVisibleStatus,
  searchQuery,
  setSearchQuery,
  fetchEpisodes,
  fetchMovies,
  fetchShows,
}) => {
  return (
    <div className="border border-black p-3 min-h-screen">
      <BodyChildren
        dbutton={dbutton}
        tableData={tableData}
        onDelete={onDelete}
        onCurrentVisibleStatus={onCurrentVisibleStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchEpisodes={fetchEpisodes}
        fetchMovies={fetchMovies}
        fetchShows={fetchShows}
      />
    </div>
  );
};

export default ChildrenBox;
