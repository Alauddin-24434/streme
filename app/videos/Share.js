'use client'
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const Share = ({video}) => {
    return (
        <div>
            <div className=' flex gap-5 ml-3 '>
      <FacebookShareButton url={video} >
        <FaFacebook className='text-white' size={20} round={true}></FaFacebook>
      </FacebookShareButton>
      <TwitterShareButton url={video} >
        <FaTwitter className='text-white' size={20} round={true}></FaTwitter>
      </TwitterShareButton>
      <LinkedinShareButton url={video} >
       <FaLinkedin className='text-white' size={20} round={true}></FaLinkedin>
      </LinkedinShareButton>
    </div>
        </div>
    );
};

export default Share;