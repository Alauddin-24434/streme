"use client";

import React, { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa6";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MdReport } from "react-icons/md";
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'; // তুমি redux ব্যবহার করলে
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import VideoPlayer from '@/components/DetailsVideo/VideoPlayer/videoPlayer';
import Playlist from '@/components/DetailsVideo/Playlist/playlist';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

interface VideoData {
  _id: string;
  title: string;
  description: string;
  genres: string;
  video: { link: string };
  thumbnail?: { link: string };
}

interface RatingData {
  _id: string;
  Id: string; // video id
  ratings: number;
}

const VideoDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const user = useSelector(selectCurrentUser);
  const email = user?.email || null;

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [likeData, setLikeData] = useState<any>(null);
  const [ratingDatas, setRatingData] = useState<RatingData[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [stateLike, setStateLike] = useState<number>(0);
  const [playlistState, setPlaylistState] = useState<number>(0);
  const [playList, setPlayList] = useState<any>(null);

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Report modal state
  const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch ratings on mount
  useEffect(() => {
    fetch('https://endgame-team-server.vercel.app/ratings')
      .then(res => res.json())
      .then(data => setRatingData(data))
      .catch(console.error);
  }, []);

  // Ratings for this video
  const allUserRating = ratingDatas.filter(r => r.Id === id);
  const totalUserRating = allUserRating.reduce((sum, r) => sum + r.ratings, 0);

  const handleStarClick = async (selectedRating: number) => {
    try {
      const res = await axios.post("https://endgame-team-server.vercel.app/rating", {
        ratings: selectedRating,
        Id: id,
      });
      if (res.data.acknowledged) {
        setUserRating(selectedRating);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch like data
  useEffect(() => {
    if (!email) return;
    axios.get(`https://endgame-team-server.vercel.app/like/${id}/${email}`)
      .then(res => setLikeData(res.data))
      .catch(console.error);
  }, [email, stateLike, id]);

  // Fetch playlist data
  useEffect(() => {
    if (!email) return;
    axios.get(`https://endgame-team-server.vercel.app/playlist/${id}/${email}`)
      .then(res => setPlayList(res.data))
      .catch(console.error);
  }, [email, playlistState, id]);

  // Update video history in localStorage
  useEffect(() => {
    const history: string[] = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    if (!history.includes(id)) {
      localStorage.setItem('videoHistory', JSON.stringify([...history, id]));
    }
  }, [id]);

  // Fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await fetch(`https://endgame-team-server.vercel.app/movies/${id}`);
        if (!res.ok) {
          console.error(`Failed to fetch video details. Status: ${res.status}`);
          return;
        }
        const data: VideoData = await res.json();
        setVideoData(data);
        setVideoLink(data.video.link);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoDetails();
  }, [id]);

  // Description toggle
  const toggleDescription = () => setShowFullDescription(prev => !prev);

  // Report checkbox change handler
  const handleOptions1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOptions1(prev =>
      prev.includes(value) ? prev.filter(opt => opt !== value) : [...prev, value]
    );
  };

  // Submit report handler
  const handleSubmit = async () => {
    try {
      await axios.post('https://endgame-team-server.vercel.app/report', {
        videoId: id,
        report: selectedOptions1,
        email,
        title: videoData?.title,
        imageurl: videoData?.thumbnail?.link,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Report video Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Average rating calculation (including user rating)
  const totalRatingValue = isFinite((totalUserRating + userRating) / (allUserRating.length || 1))
    ? parseFloat(((totalUserRating + userRating) / (allUserRating.length || 1)).toFixed(2))
    : 0;


  // Play video handler
  const handlePlayVideo = (link: string) => setVideoLink(link);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  return (
    <section>

      <div className='w-full py-16 h-screen'>
        <div className="max-w-screen-xl mt-6 bg-slate-950 px-1 mx-auto flex-row lg:flex gap-4">
          <div className="md:col-span-1 lg:col-span-2">
            <VideoPlayer video={videoLink} />
          </div>

        </div>

        <div className='bg-slate-950 px-1 h-[450px] max-w-screen-xl mx-auto'>
          <h1 className='text-sm lg:text-3xl text-white py-5 font-bold'>{videoData.title}</h1>
          <div className='flex px-1 mb-2 gap-4 items-center'>


            {/* Report Button & Modal */}
            <div className='grid grid-cols-2 items-center'>
              <div>
                <button onClick={handleOpen} className='text-white flex items-center rounded px-3 py-2 hover:bg-slate-800'>
                  <MdReport className='text-red-700 text-xl' />Report
                </button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{ backdrop: { timeout: 500 } }}
                >
                  <Fade in={open}>
                    <Box className="rounded text-white" sx={style}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        Report Video
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <div>
                          {[
                            "Hateful or abusive content",
                            "Sexual content",
                            "Violent or repulsive content",
                            "Child abuse",
                            "Harassment or bullying",
                            "Spam or misleading",
                            "Legal issue",
                          ].map((label) => (
                            <label key={label} className='m-1 block'>
                              <input
                                type="checkbox"
                                value={label}
                                checked={selectedOptions1.includes(label)}
                                onChange={handleOptions1Change}
                                className="mr-2"
                              />
                              {label}
                            </label>
                          ))}
                          <button
                            className='text-white flex items-center mt-3 bg-slate-700 rounded px-3 py-2 hover:bg-gray-600'
                            onClick={handleSubmit}
                          >
                            <MdReport className='text-red-700 mx-1 text-xl' />
                            Report
                          </button>
                        </div>
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>

          <div className='flex items-center px-1 gap-2'>
            <div>
              <FaRegStar className='text-green-600' />
              <p className='flex my-2 gap-4'>
                <span className='text-white flex'>
                  <p>{totalRatingValue || userRating}</p>
                </span>
                <div className='max-w-6xl mx-auto'>
                  <h1 className='hover:text-green-600 font-bold'>Rate now</h1>
                  <div className='rating'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        style={{ cursor: 'pointer', color: star <= userRating ? 'gold' : 'gray' }}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div>
            <div className='flex flex-row w-full lg:flex-row gap-4 px-1 mt-3'>
              {videoData && (
                <div>
                  <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white mr-2 mb-2">
                    {videoData.genres}
                  </div>
                </div>
              )}
            </div>
            <div>
              <h5 className='mt-3 text-justify px-1'>
                <span className='text-gray-600 font-bold px-1'>Description: </span>
                <p className='text-white'>
                  {showFullDescription ? videoData.description : `${videoData.description.slice(0, 50)}...`}
                </p>
                <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700">
                  {showFullDescription ? 'See less' : 'See more'}
                </button>
              </h5>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
