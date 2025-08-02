'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ChildrenBox from '@/components/dashboard/childrenBox/ChildrenBox';
import { IUser } from '@/redux/features/auth/authSlice';


const AllUsersPage: React.FC = () => {
  const dbutton = "Add Users";
  const [allUsersData, setAllUsersData] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>('https://endgame-team-server.vercel.app/usersSearch', {
          params: { searchQuery },
        });
        setAllUsersData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleCurrentVisibilityStatus = async (userId: string, currentStatus: string) => {
    try {
      await axios.put(`https://endgame-team-server.vercel.app/latestUsers/${userId}`, { status: currentStatus });
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

  const handleDeleteData = async (userId: string) => {
    try {
      await axios.delete(`https://endgame-team-server.vercel.app/latestUsers/${userId}`);
      setAllUsersData(prevUsers => prevUsers.filter(user => user._id !== userId));
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
        dbutton={dbutton}
        onDelete={handleDeleteData}
        onCurrentVisibleStatus={handleCurrentVisibilityStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchEpisodes={undefined}
        fetchMovies={undefined}
        fetchShows={undefined}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AllUsersPage;
