import React, { useState } from 'react';

const EpisodeModal = ({ closeModal }) => {
  const EpisodeName = [
    {
      id: 0,
      name: "alpa",
      isisSeason: ["012633", "64454", "7474"],
    },
    {
      id: 1,
      name: "salpa",
      isisSeason: ["012633", "64454", "7474"],
    },
    {
      id: 2,
      name: "glpa",
      isisSeason: ["012633", "64454", "7474"],
    },
    {
      id: 3,
      name: "slpa",
      isisSeason: ["012633", "64454", "7474"],
    },
  ];

  const [formData, setFormData] = useState({
    showName: EpisodeName[0].name,
    season: EpisodeName[0].isisSeason[0],
    description: '',
    castAndCrew: [
      {
        id: 0,
        name: '',
        role: '',
        image: null,
      },
    ],
    releaseDate: '',
    publicDate: '',
    duration: '',
    thumbnail: null,
    poster: null,
    trailerUrl: '',
    videoQuality: '480',
    video: null,
  });

  const handleCastAndCrewChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCastAndCrew = [...formData.castAndCrew];
    updatedCastAndCrew[index] = { ...updatedCastAndCrew[index], [name]: value };
    setFormData({ ...formData, castAndCrew: updatedCastAndCrew });
  };

  const handleFileUpload = (e, index) => {
    const imageFile = e.target.files[0];
    const updatedCastAndCrew = [...formData.castAndCrew];
    updatedCastAndCrew[index] = { ...updatedCastAndCrew[index], image: imageFile };
    setFormData({ ...formData, castAndCrew: updatedCastAndCrew });
  };

  const handleAddCastAndCrew = () => {
    const newId = formData.castAndCrew.length;
    const updatedCastAndCrew = [...formData.castAndCrew, { id: newId, name: '', role: '', image: null }];
    setFormData({ ...formData, castAndCrew: updatedCastAndCrew });
  };

  const handleRemoveCastAndCrew = (index) => {
    const updatedCastAndCrew = formData.castAndCrew.filter((_, i) => i !== index);
    setFormData({ ...formData, castAndCrew: updatedCastAndCrew });
  };

  const handleDateAndDurationChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaFileUpload = (e, name) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    closeModal();
  };

  return (
    <div>
      <div className='flex items-center justify-center bg-black bg-opacity-50'>
        <div className='w-full p-2'>
          <form action=''>
            <fieldset className='border p-4'>
              <legend>Episodes</legend>

             
              <div className='flex mb-4 gap-4 flex-col lg:flex-row lg:justify-between items-center'>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Show Name:</label>
                  <select
                    name='showName'
                    value={formData.showName}
                    onChange={(e) => setFormData({ ...formData, showName: e.target.value })}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  >
                    {EpisodeName.map((ep) => (
                      <option key={ep.id} value={ep.name}>
                        {ep.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='w-full'>
                  <label className='block text-sm font-medium text-gray-600'>Season:</label>
                  <select
                    name='season'
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  >
                    {EpisodeName
                      .find((ep) => ep.name === formData.showName)
                      .isisSeason.map((season) => (
                        <option key={season} value={season}>
                          {season}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  placeholder='Description'
                />
              </div>

              <fieldset className='border p-4'>
                <legend>Cast and Crew</legend>
                {formData.castAndCrew.map((member, index) => (
                  <div key={index} className='mb-4 flex flex-col lg:flex-row lg:justify-between items-center gap-2 '>
                    <label className='block text-sm font-medium text-gray-600'>Name:</label>
                    <input
                      type='text'
                      name='name'
                      value={member.name}
                      onChange={(e) => handleCastAndCrewChange(e, index)}
                      className='mt-1 p-2 border bg-slate-800 rounded w-full'
                      placeholder='Enter Name'
                    />

                    <label className='block text-sm font-medium text-gray-600'>Role:</label>
                    <input
                      type='text'
                      name='role'
                      value={member.role}
                      onChange={(e) => handleCastAndCrewChange(e, index)}
                      className='mt-1 p-2 border bg-slate-800 rounded w-full'
                      placeholder='Enter Role'
                    />

                    <label className='block text-sm font-medium text-gray-600'>Image:</label>
                    <input
                      type='file'
                      name='image'
                      onChange={(e) => handleFileUpload(e, index)}
                      className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    />

                    <button
                      type='button'
                      onClick={() => handleRemoveCastAndCrew(index)}
                      className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2'
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </fieldset>

              <button
                type='button'
                onClick={handleAddCastAndCrew}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600'
              >
                Add Cast and Crew
              </button>

              <div className='flex flex-col lg:flex-row lg:justify-between items-center gap-2'>
                <div className="">
                  <label htmlFor="releaseDate" className="text-sm block font-semibold text-gray-600">
                    Release Date
                  </label>
                  <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleDateAndDurationChange}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>

                <div className="">
                  <label htmlFor="publicDate" className="text-sm block font-semibold text-gray-600">
                    Public Date
                  </label>
                  <input
                    type="date"
                    id="publicDate"
                    name="publicDate"
                    value={formData.publicDate}
                    onChange={handleDateAndDurationChange}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>

                <div className="">
                  <label htmlFor="duration" className="text-sm block font-semibold text-gray-600">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleDateAndDurationChange}
                    placeholder="Enter duration (e.g., 120 minutes)"
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>
              </div>

              <fieldset className='border p-4'>
                <legend>MEDIA</legend>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>Thumbnail:</label>
                  <input
                    type='file'
                    name='thumbnail'
                    onChange={(e) => handleMediaFileUpload(e, 'thumbnail')}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>Poster:</label>
                  <input
                    type='file'
                    name='poster'
                    onChange={(e) => handleMediaFileUpload(e, 'poster')}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>Trailer URL:</label>
                  <input
                    type='text'
                    name='trailerUrl'
                    value={formData.trailerUrl}
                    onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                    className='mt-1 p-2 border bg-slate-800 rounded w-full'
                  />
                </div>

                <h2>Video Quality</h2>
                <div className='flex justify-between items-center mb-4 gap-4'>

                  <div className='w-full'>
                    <label className='block text-sm font-medium text-gray-600'>Quality</label>
                    <select
                      id="videoQuality"
                      name='videoQuality'
                      value={formData.videoQuality}
                      onChange={(e) => setFormData({ ...formData, videoQuality: e.target.value })}
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
                      onChange={(e) => handleMediaFileUpload(e, 'video')}
                      className='mt-1 p-2 border bg-slate-800 rounded w-full'
                    />
                  </div>
                </div>

                <button
                  type='button'
                  onClick={handleSave}
                  className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600'
                >
                  Save
                </button>
              </fieldset>

            </fieldset>

          

         
          
          </form>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeModal;

          
        
