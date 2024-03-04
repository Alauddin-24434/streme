
"use client"
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AllUsersPage = () => {
    
    const [allUsersData, setAllUsersData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://endgame-team-server.vercel.app/usersSearch', {
                    params: { searchQuery } // Use searchQuery state as a query parameter
                });
                setAllUsersData(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchUsers();
    }, [searchQuery]); // Include searchQuery in the dependency array

    const handleCurrentVisibilityStatus = async (usersId, currentStatus) => {
        try {
            await axios.put(`https://endgame-team-server.vercel.app/latestUsers/${usersId}`, { status: currentStatus });
          
            toast.success('Status updated successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
            
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status', {
                icon: '❌',
                style: {
                    backgroundColor: '#FF6347',
                    color: '#FFFFFF',
                },
            });
        }
    };
   
    
  
    const handleDeleteData = async (userId) => {
        try {
            await axios.delete(`https://endgame-team-server.vercel.app/latestUsers/${userId}`); // Correct endpoint
            setMovieData(prevMovies => prevMovies.filter(user  => user ._id !== movieId));
            toast.success('User deleted successfully', {
                icon: '🚀',
                style: {
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                },
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user', {
                icon: '❌',
                style: {
                    backgroundColor: '#FF6347',
                    color: '#FFFFFF',
                },
            });
        }
    };

    return (
        <div>
            <ChildrenBox
                tableData={allUsersData}
        
                onDelete={handleDeleteData}
                onCurrentVisibleStatus={handleCurrentVisibilityStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default AllUsersPage;
