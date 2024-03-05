import React from 'react';

const UserVideoCard = () => {
    const video = {
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/endgame-team-project.appspot.com/o/images%2Fil_fullxfull.5169899359_1uwk.webp?alt=media&token=5cefcd0a-ee37-4461-83e0-c816e09735ff',
        userPhoto: 'https://example.com/user.jpg',
        userName: 'John Doe',
        title: 'Awesome YouTube Video',
        description: 'This is an awesome YouTube video. Check it out!',
      };
  return (
    <div className="card w-60">
      <div className="thumbnail">
        <img className='w-full h-36' src={video.thumbnailUrl} alt="Video Thumbnail" />
      </div>
      <div className="user-info">
        <img src={video.userPhoto} alt="User" />
        <span className="user-name">{video.userName}</span>
      </div>
      <div className="video-details">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  );
};

export default UserVideoCard;
