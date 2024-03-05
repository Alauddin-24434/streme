
"use client";
// pages/video/[id].js
import { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa6";
import VideoPlayer from '@/components/DetailsVideo/VideoPlayer/videoPlayer';
import Comments from "@/components/Comment/Comments";
import Like from '../../../components/DetailsVideo/Like/Like';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import useUserInfo from '@/hooks/useUser';
import axios from 'axios';
import Playlist from '../../../components/DetailsVideo/Playlist/playlist';
import PlaylistButton from '../../../components/DetailsVideo/PlaylistButton/PlaylistButton';
import Suggest from '../../../components/DetailsVideo/Suggest/Suggest';
import Share from '../../../components/DetailsVideo/share/Share';
import Sidebar from '@/app/Sidebar/Sidebar';
// video Report code
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MdReport } from "react-icons/md";
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};
// video Report code


const VideoDetail = ({ params }) => {
  const { id } = params;
  // console.log('ID Prams define',params)
  const [videoData, setVideoData] = useState();
  const [videoLink, setVideoLink] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const userInfo = useUserInfo();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const email = userInfo?.email
  // console.log(likeData);
  // console.log("chek", videoData)
  const [ratingDatas, setRatingData] = useState([])
  const [data, setData] = useState(0)
  const [usersRating, setUserRating] = useState(0)
  const [stateLike, setStateLike] = useState(0);
  const [playlist, setStatePlaylike] = useState(0);
  const [playList, setPlayList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(likeData);
  console.log("chek", videoData)

  // video Report
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // video Report

 // =-=-=-=-=-=-=-=-user rating=-=-=-=-=-=-
 const AllUserRating = ratingDatas.filter(user => user.Id == id);
 console.log(AllUserRating)

 const totaluserRating = AllUserRating.reduce((total, totalRating) => total + totalRating.ratings
   , 0);

 const handleStarClick = async (selectedRating) => {
   await axios.post("https://endgame-team-server.vercel.app/rating", {
     ratings: selectedRating,
     Id: id
   })
     .then(res => {
       if (res.data.acknowledged) {
         setData(data + 1)
         console.log(res)
       }
     })
     .catch(error => console.error(error))
   setUserRating(selectedRating)
 };

 useEffect(() => {
   fetch('https://endgame-team-server.vercel.app/ratings')
     .then(res => res.json())
     .then(dataes => setRatingData(dataes))
     .catch(error => console.error('Error fetching ratings:', error));
 }, []);
 // =-=-=-=-=-=-=-=-user rating=-=-=-=-=-=-


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {

          const response = await axios.get(`https://endgame-team-server.vercel.app/like/${id}/${email}`);
          const responseData = response.data;
          // console.log(responseData);
          setLikeData(responseData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email, stateLike]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {

          const response = await axios.get(`https://endgame-team-server.vercel.app/playlist/${id}/${email}`);
          const responseData = response.data;
          // console.log(responseData);
          setPlayList(responseData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email, playlist])



  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    if (history.includes(id)) {
      console.log(id);
    } else {
      // console.log('Adding to video history');
      const updatedHistory = [...history, id];
      localStorage.setItem('videoHistory', JSON.stringify(updatedHistory));
    }
  }, [id]);


console.log(playlist)

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://endgame-team-server.vercel.app/movies/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch video details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();

        setVideoData(data)
        setVideoLink(data?.video?.link);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);



  console.log("chek genere", videoData)

  if (!videoData) {
    // Render loading state or handle loading scenario
    return <p>Loading...</p>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePlayVideo = (VideoLink) => {
    // console.log('this is playing', VideoLink);
    setVideoLink(VideoLink)
  };

  // user Report function
  const handleOptions1Change = (event) => {
    const { value } = event.target;
    setSelectedOptions1((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((option) => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  const handleSubmit = async () => {
    await axios.post(('https://endgame-team-server.vercel.app/report'), {
     videoId: id,
      report: selectedOptions1,
      email,
      title:videoData?.title,
      imageurl:videoData.thumbnail?.link
    })
      .then(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Report video Success",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(res)
      })
      .catch(error => console.log(error))
    console.log(selectedOptions1)
   setOpen(false);

  };
  // user Report function
// =-=-=-=-=-=-=-=-user rating=-=-=-=-=-=-
const totleRatingValue = !isNaN(parseFloat((((totaluserRating + usersRating)) / AllUserRating.length).toFixed(3)))
? parseFloat((((totaluserRating + usersRating)) / AllUserRating.length).toFixed(2))
: 0 
  // =-=-=-=-=-=-=-=-user rating=-=-=-=-=-=-
  return (
    <section>
      <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
      <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
      <div className='w-full py-16 h-screen '>
        <div className="max-w-screen-xl mt-6  bg-slate-950 px-1 mx-auto flex-row lg:flex gap-4">
          <div className="md:col-span-1 lg:col-span-2">
            <VideoPlayer video={videoLink} />
          </div>
          <div className="md:col-span-1  mb-2 lg:col-span-1 px-1  h-[580px]">
            <h2 className='text-center py-2 rounded-t-lg text-white bg-slate-900'>{videoData?.genres}</h2>
            <Playlist videoData={videoData} handlePlayVideo={handlePlayVideo}></Playlist>
            <h2 className='text-center py-4 mt-1 rounded-b-lg text-white bg-slate-900'></h2>
          </div>
        </div>

        <div className=' bg-slate-950 px-1 h-[450px] max-w-screen-xl mx-auto '>  <h1 className='tex-sm lg:text-3xl  text-white py-5 font-bold'>{videoData?.title}</h1>    
          <div className='flex px-1 mb-2 flex-row gap-4 items-center md:flex-row lg:flex-row xl:flex-row 2xl:flex lg:items-center xl:items-center 2xl:items-center'>
            <Like setStateLike={setStateLike} likeData={likeData} data={videoData} stateLike={stateLike}></Like>
            <PlaylistButton playlist={playlist} setStatePlaylike={setStatePlaylike} data={videoData} playList={playList}></PlaylistButton>
            <Share video={videoData.video.link} />
             {/* start Report */}
          <div className='grid grid-cols-2 items-center'>
          
            <div>
              <button onClick={handleOpen} className='text-white flex items-center rounded px-3 py-2 hover:bg-slate-800'><MdReport className='text-red-700 text-xl' />Report</button>

              <Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box className="rounded text-white" sx={style}>

                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Report Video
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                      <div>
                        <div>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Hateful or abusive content"
                              checked={selectedOptions1.includes('Hateful or abusive content')}
                              onChange={handleOptions1Change}
                            />
                            Hateful or abusive content
                          </label>
                          <br></br>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Sexual content"
                              checked={selectedOptions1.includes('Sexual content')}
                              onChange={handleOptions1Change}
                            />
                            Sexual content
                          </label>
                        </div>
                        <div>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Violent or repulsive content"
                              checked={selectedOptions1.includes('Violent or repulsive content')}
                              onChange={handleOptions1Change}
                            />
                            Violent or repulsive content
                          </label>
                          <br></br>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Child abuse"
                              checked={selectedOptions1.includes('Child abuse')}
                              onChange={handleOptions1Change}
                            />
                            Child abuse
                          </label>
                          <br></br>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Harassment or bullying"
                              checked={selectedOptions1.includes('Harassment or bullying')}
                              onChange={handleOptions1Change}
                            />
                            Harassment or bullying
                          </label>
                          <br></br>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Spam or misleading"
                              checked={selectedOptions1.includes('Spam or misleading')}
                              onChange={handleOptions1Change}
                            />
                            Spam or misleading
                          </label>
                          <br></br>
                          <label className='m-1'>
                            <input
                              type="checkbox"
                              value="Legal issue"
                              checked={selectedOptions1.includes('Legal issue')}
                              onChange={handleOptions1Change}
                            />
                            Legal issue
                          </label>
                        </div>
                        <button className='text-white flex items-center mt-3 bg-slate-700 rounded px-3 py-2 hover:bg-gray-600' onClick={handleSubmit}><MdReport className='text-red-700 mx-1 text-xl' />Report</button>
                      </div>

                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
                      </div>
                      {/* End Report */}
          </div>

          <div className='flex items-center px-1 gap-2'>
            <div >
              <FaRegStar className='text-green-600' />
              <p className='flex my-2 gap-4'>
                <span className='text-white flex'> <p>{
                isFinite(totleRatingValue) ? totleRatingValue : usersRating 
}</p></span>
                <div className='max-w-6xl mx-auto'>
                  <h1 className='hove text-green-600 font-bold'>Rate now</h1>
                  <div className='rating'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        style={{
                          cursor: 'pointer',
                          color: star <= usersRating ? 'gold' : 'gray',
                        }}
                      >
                        &#9733;

                      </span>
                    ))}
                    <br></br>

                  </div>
                  {/* <p className='text-stone-200'>Selected Rating: {rating}</p> */}
                </div>
              </p>
            </div>


          </div>

          <div>
            <div className='flex flex-row w-full lg:flex-row gap-4 px-1 mt-3'>
              {videoData &&
                <div>

                  <div className="inline-block px-2 py-1 text-sm font-semibold rounded-sm bg-gray-500 text-white mr-2 mb-2">
                    {videoData.genres}
                  </div>

                </div>
              }

            </div>
            <div>
              {/* description section start */}
              <h5 className='mt-3 text-justify px-1'>
                <span className='text-gray-600 font-bold px-1'>Description: </span>
                <p className='text-white'>
                  {showFullDescription ? videoData?.description : `${videoData?.description.slice(0, 50)}...`}
                </p>
                <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700">
                  {showFullDescription ? 'See less' : 'See more'}
                </button>
              </h5>
              {/* end */}
            </div>

            {/* comment section */}

            <div className='w-full bg-slate-950 h-screen px-1 mt-6'>
              <Suggest></Suggest>
              <Comments videoId={id} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default VideoDetail;