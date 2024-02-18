"use client"
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { storage } from '@/utils/firebase-config';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const MovieModal = ({ closeModal }) => {
  const [movieInfo, setMovieInfo] = useState({
    movieName: '',
    description: '',
    access: 'standard',
    language: 'English',
    genres: 'Action',
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    thumbnail: { file: null, link: null },
    poster: { file: null, link: null },
    trailerUrl: '',
    videoQuality: '480',
    video: { file: null, link: null },
    audience: '', // New state variable for audience selection
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const getStoragePath = (name, file) => {
    if (name === 'thumbnail' || name === 'poster') {
      return `images/${file.name}`;
    } else if (name === 'video') {
      return `videos/${file.name}`;
    }
    return '';
  };

  const handleFileUpload = async (e) => {
    if (!isClient) return;

    const { name, files } = e.target;

    if (!files || files.length === 0) {
      console.error('No files selected for upload');
      return;
    }

    const uploadedFile = files[0];

    if (!uploadedFile) {
      console.error('Uploaded file is not defined');
      return;
    }

    const storagePath = getStoragePath(name, uploadedFile);
    const storageRef = ref(storage, storagePath);

    try {
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      switch (name) {
        case 'thumbnail':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            thumbnail: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'poster':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            poster: { file: uploadedFile, link: downloadURL },
          }));
          break;
        case 'video':
          setMovieInfo((prevInfo) => ({
            ...prevInfo,
            video: { file: uploadedFile, link: downloadURL },
          }));
          break;
        default:
          break;
      }

      toast.success(`${name} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
      toast.error(`Error uploading ${error}`);
    }
  };

  const handleSave = async () => {
    try {
      console.log('Movie Info:', movieInfo);
  
      const response = await axios.post('https://endgame-team-server.vercel.app/movies', movieInfo);
  
      if (response.status === 200) {
        console.log('Movie saved successfully:', response.data);
  
        // Access the properties from the response and include them in the toast
        const { acknowledged, insertedId } = response.data;
  
        toast.success(`Movie saved successfully! Acknowledged: ${acknowledged}, Inserted ID: ${insertedId}`, {
          autoClose: 5000, // Set the duration in milliseconds (e.g., 5000ms or 5 seconds)
          // Other toast options can be set here
        });
        
        closeModal(); 
      } else {
        console.error('Failed to save movie:', response.status, response.statusText);
        toast.error('Failed to save movie. Please try again.');
      }
      
    } catch (error) {
      console.error('Error saving movie:', error.message);
      toast.error('Error saving movie. Please try again.');
    }
  };
  

  return (
    <div className='w-full'>
      <div className='flex items-center justify-center bg-slate-900 bg-opacity-50'>
        <div className='p-6 rounded-lg w-full'>
          <h2 className='text-2xl font-bold mb-4'>Add Movie</h2>
          <form>
            <fieldset className='border p-4'>
              <legend>Movie</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-white'>Movie Name:</label>
                <input
                  type='text'
                  name='movieName'
                  value={movieInfo.movieName}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border text-white bg-slate-800 rounded w-full'
                  placeholder='Enter Movie Name'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  value={movieInfo.description}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  placeholder='Description'
                />
              </div>

              <div className='flex mb-4 gap-4 flex-col lg:flex-row lg:justify-between items-center'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Movie Access:</label>
                  <select
                    name="access"
                    id="movie-access"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    value={movieInfo.access}
                    onChange={handleInputChange}
                  >
                    <option value="Free">Free</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Language:</label>
                  <select
                    name="language"
                    id="language"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    value={movieInfo.language}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="Bangla">Bangla</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="China">China</option>
                  </select>
                </div>
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Genres:</label>
                <select
                  name="genres"
                  id="genres"
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  value={movieInfo.genres}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </fieldset>

            <fieldset className='border p-4'>
              <legend>Audience</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Audience:</label>
                <select
                  name="audience"
                  id="audience"
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  value={movieInfo.audience}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Audience</option>
                  <option value="adults">Adults</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </fieldset>
            <fieldset className='border p-4'>
              <legend>SEO</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>SEO Title:</label>
                <input
                  type='text'
                  name='seoTitle'
                  value={movieInfo.seoTitle}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>SEO Description:</label>
                <textarea
                  name='seoDescription'
                  value={movieInfo.seoDescription}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Keywords:</label>
                <input
                  type='text'
                  name='keywords'
                  value={movieInfo.keywords}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>
            </fieldset>

            <fieldset className='border p-4'>
              <legend>MEDIA</legend>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Thumbnail:</label>
                <input
                  type='file'
                  name='thumbnail'
                  onChange={handleFileUpload}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Poster:</label>
                <input
                  type='file'
                  name='poster'
                  onChange={handleFileUpload}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Trailer URL:</label>
                <input
                  type='text'
                  name='trailerUrl'
                  value={movieInfo.trailerUrl}
                  onChange={(e) => handleInputChange(e)}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                />
              </div>

              <h2>Video Quality</h2>
              <div className='flex flex-col lg:justify-between items-center mb-4 gap-4'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Quality</label>
                  <select
                    id="videoQuality"
                    name='videoQuality'
                    value={movieInfo.videoQuality}
                    onChange={(e) => handleInputChange(e)}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    placeholder="select genres"
                  >
                    <option value="480">480</option>
                    <option value="720">720</option>
                    <option value="1080">1080</option>
                  </select>
                </div>
                <div className=' w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Video:</label>
                  <input
                    type='file'
                    name='video'
                    onChange={handleFileUpload}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>
              </div>
            </fieldset>
          </form>
          <div className='flex justify-between text-sm lg:text-lg gap-x-2 py-2'>
            <button
              type='button'
              onClick={handleSave}
              className='bg-blue-500  text-white py-2 px-4 rounded hover:bg-green-600'
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
            >
              Close Modal
            </button>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default MovieModal;