'use client'

const Playlist = () => {
  const playlistData = [
    { id: 1, title: 'Video 1', url: '/12.mp4', thumbnail: 'https://i.ibb.co/G3Mb9pd/Screenshot-2024-01-24-201231.png' },
    { id: 2, title: 'Video 2', url: '/Facebook_34.mp4', thumbnail: 'https://i.ibb.co/NySPvSx/Screenshot-2024-01-24-002403.png' },
    { id: 3, title: 'Video 3', url: '/12.mp4', thumbnail: 'https://i.ibb.co/G3Mb9pd/Screenshot-2024-01-24-201231.png' },
    { id: 4, title: 'Video 4', url: '/Facebook_34.mp4', thumbnail: 'https://i.ibb.co/NySPvSx/Screenshot-2024-01-24-002403.png' },
    { id: 5, title: 'Video 5', url: '/12.mp4', thumbnail: 'https://i.ibb.co/G3Mb9pd/Screenshot-2024-01-24-201231.png' },
    { id: 6, title: 'Video 6', url: '/Facebook_34.mp4', thumbnail: 'https://i.ibb.co/NySPvSx/Screenshot-2024-01-24-002403.png' },
    { id: 7, title: 'Video 7', url: '/12.mp4', thumbnail: 'https://i.ibb.co/G3Mb9pd/Screenshot-2024-01-24-201231.png' },
    { id: 8, title: 'Video 8', url: '/Facebook_34.mp4', thumbnail: 'https://i.ibb.co/NySPvSx/Screenshot-2024-01-24-002403.png' },    
  ];
  const handlePlayVideo = (id) => {
    console.log('this is playing', id);
  }
  

  return (
    <div className="w-80 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1  px-3  py-2 gap-4 overflow-y-auto max-h-[57vh]">
      {playlistData.map((video) => (
        <button onClick={() => handlePlayVideo(video.id)} key={video.id} className="hover:bg-gray-300">
          <div className="px-2 py-3 border rounded-lg shadow-md">
            <div className="flex items-center">
              <img src={video.thumbnail} alt={video.title} className="h-14 w-auto mr-2" />
              <p className="text-base font-semibold">{video.title}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Playlist;
