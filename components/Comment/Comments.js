"use client";
import { getComments as getCommentApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateComment as updateCommentApi } from "./api"
import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import axios from "axios";
const Comments = () => {
    const [backendComments, setBackendComment] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const [data, setData] = useState(0)
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === 'null')
    const date = new Date()
    const videoId = '123456'
    const user = {
        displayName: "Alauddin",
        email: "sajalb1899@gmail.com",
        photoURL: "https://i.ibb.co/vLy1HMH/2021-02-13-17-38-29-277.jpg",
    }
    console.log(backendComments)

    //new comment add
    const addComment = (text, parentId) => {

        console.log('addComment', text, parentId)
        const postComment = {
            body: text,
            username: user.displayName,
            userId: user.email,
            userImage: user.photoURL,
            parentId: parentId ? parentId : "null",
            createdAt: date,
            videoId,
        }
        axios.post('https://endgame-team-server.vercel.app/comments', postComment)
            .then(res => {
                if (res.data.acknowledged) {
                    setData(data + 1)
                }
            })
            .catch(error => {
                console.log(error)
            })

        setActiveComment(null)

    }
    //delete comment
    const deleteComment = (commentId) => {
        if (window.confirm('are you sure that you want to remove comment?')) {

            axios.delete(`https://endgame-team-server.vercel.app/comments/${commentId}`)
                .then(res => {
                    console.log(res.data)
                })
            setData(data + 1)
            // deleteCommentApi(commentId).then(() => {
            //     const updateBackendComment = backendComments.filter(backendComment => backendComment.id !== commentId)
            //     setBackendComment(updateBackendComment)
            // })
        }

    }
    //Update Comment 
    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {


            axios.patch(`https://endgame-team-server.vercel.app/comments/${commentId}`, { body: text })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        setData(data + 1)
                    }
                })




            // const updateBackendComments = backendComments.map(backendComment => {
            //     if (backendComment.id === commentId) {
            //         return { ...backendComment, body: text };
            //     }
            //     return backendComment;
            // });
            // console.log(updateBackendComments)
            // setBackendComment(updateBackendComments)
            setActiveComment(null)
        });
    };


    // const store = axios.get('https://endgame-team-server.vercel.app/comments?parentId=null').then(res => res.data)

    // console.log('store', store)

    //reply data 
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAd).getTime() - new Date(b.createdAd))
    }

    //Root Comment Data
    useEffect(() => {
        axios.get(`https://endgame-team-server.vercel.app/comments?videoId=${videoId}`)
            .then(res => {
                setBackendComment(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [data])


    return (
        <Box sx={{ maxWidth: '1480px', margin: 'auto', margin: 4, color:"white" }}>
            <Typography sx={{ fontSize: 30, fontWeight: 700,color:"white" }}>({backendComments.length})Comment</Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' ,color:"white"}}>
                <Avatar alt="Remy Sharp" src={user.photoURL} />
                <CommentForm submitLabel="Comment" handleSubmit={addComment} />
            </Box>
            {/* All Comment...................... */}
            {
                rootComments.map(rootComment => <Comment key={rootComment._id}
                    comment={rootComment}
                    replies={getReplies(rootComment._id)}
                    currentUserId={user.email}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}

                ></Comment>)
            }
        </Box>
    );
};

export default Comments;