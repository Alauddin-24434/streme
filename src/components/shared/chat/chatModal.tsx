'use client';



import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

import { IoMdClose } from 'react-icons/io';
import { IoChatbubbleOutline, IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';

interface MovieData {
  title: string;
  boxOffice: string;
  releaseDate: string;
  director: string;
}

interface ChatHistoryItem {
  userMessage: string;
  botResponse: string;
}

const ChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [data, setData] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
const user= useSelector(selectCurrentUser);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/chatbot');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const botResponse = getBotResponse(userMessage.toLowerCase());
    setChatHistory((prevHistory) => [...prevHistory, { userMessage, botResponse }]);
    setUserMessage('');
  };

  const getBotResponse = (message: string): string => {
    if (message === 'hi') {
      return 'Hello, how can I help you?';
    } else if (message.includes('thank you') || message.includes('thank for your help')) {
      return "You're welcome!";
    } else if (message.includes('can you help me') || message.includes('help')) {
      return 'Sure, how can I help you?';
    } else if (message.includes('you are so sweet')) {
      return "Sorry! I'm an Artificial Intelligence program.";
    }

    const movie = data.find((movie) => message.includes(movie.title.toLowerCase()));

    if (!movie) {
      return "Sorry, I couldn't find information about that movie";
    }

    let response = '';

    if (message.includes('box office collection')) {
      response += `The box office collection of ${movie.title} is ${movie.boxOffice}. `;
    }
    if (message.includes('total income')) {
      response += `Total income of ${movie.title} is ${movie.boxOffice}. `;
    }
    if (message.includes('release date')) {
      response += `The release date of ${movie.title} is ${movie.releaseDate}.`;
    }
    if (message.includes('director')) {
      response += `The director of ${movie.title} is ${movie.director}.`;
    }

    if (response === '') {
      return "I'm sorry, I didn't understand that. Please specify if you want to know about the box office collection or the release date.";
    }

    return response;
  };

  return (
    <>
      <button
        className="fixed bottom-4 mr-14 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-600 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={toggleModal}
      >
        <IoChatbubbleOutline className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-100 h-[500px] flex flex-col max-w-lg mx-auto">
            <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
              {user?.name ? (
                <p>{user?.name}</p>
              ) : (
                <div className="h-6 w-6 rounded-md bg-gray-300" />
              )}
              <span>Chatbot</span>
              <div className="relative inline-block text-left">
                <button onClick={toggleModal} id="setting" className="hover:bg-blue-400 rounded-md p-1">
                  <IoMdClose />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-2">
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs break-words">
                        {chat.userMessage}
                      </div>
                    </div>
                    {/* Bot response */}
                    <div className="flex">
                      <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs break-words">
                        {chat.botResponse}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                {isLoading && <p className="text-center text-gray-500">Loading chatbot data...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
              </div>
            </div>

            <div className="bg-white p-4 flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-black border text-white rounded-full px-4 py-2 focus:outline-none"
                value={userMessage}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(e as any);
                }}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
                onClick={handleSubmit}
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
