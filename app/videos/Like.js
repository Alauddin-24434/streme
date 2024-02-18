import React, { useState } from 'react';
import axios from 'axios';
import useUserInfo from '@/hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
const Like = ({ data, likeData }) => {
    const [liked, setLiked] = useState(false);
    // console.log(likeData);
    // console.log(data);
    const userInfo = useUserInfo();
    const email=userInfo?.email


    console.log("my",email)

    const toggleLike = async () => {
        try {
            // Send POST request to the specified endpoint
            const response = await axios.post("https://endgame-team-server.vercel.app/like", {data,email});
            console.log("Response:", response.data);
            console.log({
                videos: data,
                liked: true
                
            });
            setLiked(!liked);
           
            console.log({liked: true,
            Video: data});
        } catch (error) {
            console.error("Error:", error);
           
            toast.error("Something went wrong!")
        
        }
    };

    

    return (
        <div>
            <button onClick={toggleLike} style={{ color: liked ? 'red' : 'black' }}>
                {liked ? '❤️ Liked' : '🤍 '}
            </button>
            <Toaster
        position="top-center"
        reverseOrder={false}
      />
        </div>
    );
};

export default Like;
