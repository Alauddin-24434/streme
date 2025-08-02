import React from "react";

export interface Episode {
  _id: string;
  title: string;
  episodes: number; // episode number
  thumbnail: {
    link: string;
  };
  video: {
    link: string;
  };
  views: number;
}

interface EpisodePlayListProps {
  handleEpisodeClick: (
    id: string,
    videoLink: string,
    episodeNumber: number,
    index: number,
    views: number
  ) => void;
  playlist: Episode[] | null;
  episodeNumber: number | null;
  handlePreviousEpisode: () => void;
  handleNextEpisode: () => void;
}

const EpisodePlayList: React.FC<EpisodePlayListProps> = ({
  handleEpisodeClick,
  playlist,
  episodeNumber,
  handlePreviousEpisode,
  handleNextEpisode,
}) => {
  if (!playlist) return null;

  return (
    <div>
      <h2 className="text-center my-4 lg:my-0 py-2 rounded-t-lg text-white bg-slate-800">
        Play List
      </h2>
      <div className="max-w-[300px] lg:w-80 mx-auto grid grid-cols-1 px-3 py-2 gap-4 overflow-y-auto max-h-[57vh]">
        {playlist.map((episode, index) => (
          <button
            key={episode._id}
            onClick={() =>
              handleEpisodeClick(
                episode._id,
                episode.video.link,
                episode.episodes,
                index,
                episode.views
              )
            }
            className={`hover:bg-green-700 rounded-lg ${
              episode.episodes === episodeNumber ? "bg-green-700" : ""
            }`}
          >
            <div className="py-1 border rounded-lg shadow-md">
              <div className="flex items-center">
                <img
                  src={episode.thumbnail.link}
                  alt={episode.title}
                  className="h-14 w-auto mr-2"
                />
                <p className="text-base text-white font-semibold">
                  {episode.title.length > 20
                    ? `${episode.title.slice(0, 20)}...`
                    : episode.title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <h2 className="text-center flex justify-center gap-4 items-center py-2 mt-1 rounded-b-lg text-white bg-slate-800">
        <div
          className="flex items-center space-x-2 hover:text-green-500 cursor-pointer"
          onClick={handlePreviousEpisode}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') handlePreviousEpisode(); }}
        >
          <span>Previous</span>
        </div>
        <div
          className="flex items-center space-x-2 hover:text-green-500 cursor-pointer"
          onClick={handleNextEpisode}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') handleNextEpisode(); }}
        >
          <span>Next</span>
        </div>
      </h2>
    </div>
  );
};

export default EpisodePlayList;
