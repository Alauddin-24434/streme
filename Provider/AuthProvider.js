// authProvider.js
"use client";
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {GoogleAuthProvider,GithubAuthProvider,signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios'
const firebaseConfig = {
  apiKey: "AIzaSyBv5o9wisLho90U-2XgJSl7Z3PT7sSHfgE",
  authDomain: "endgame-team-project.firebaseapp.com",
  projectId: "endgame-team-project",
  storageBucket: "endgame-team-project.appspot.com",
  messagingSenderId: "49379562265",
  appId: "1:49379562265:web:b89b8fb280bcfa879d6b88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const AuthContext = React.createContext();
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

const setUserInLocalStorage = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUserInLocalStorage(userCredential.user);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const signup = async (email, password,username,gender, age) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password,username,gender, age);
    setUserInLocalStorage(userCredential?.user);

    // Check if the user is signing up for the first time
    if (userCredential) {
      const currentDate = new Date().toISOString(); // Get the current date and time in ISO string format

      // Send user data to your server endpoint using Axios
      await axios.post('https://endgame-team-server.vercel.app/users', {
        uid: userCredential.user.uid,
        userName:username,
        photoURL:userCredential.user.photoURL,
        email: userCredential.user.email,
        provider: 'google',
        isAdmin: false, // Set isAdmin to false by default
        isPayment: false, // Set isPayment to false by default
        signupDate: currentDate ,// Include the current date
        gender:gender,
         age:age
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};





export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider); // Open Google Sign-In popup
    setUserInLocalStorage(userCredential.user);

    // Check if the user is signing in with Google for the first time
    if (userCredential) {
      const currentDate = new Date().toISOString(); // Get the current date and time in ISO string format

      // Send user data to your server endpoint using Axios
      await axios.post('https://endgame-team-server.vercel.app/users', {
        uid: userCredential.user.uid,
        userName:userCredential.user.displayName,
        photoURL:userCredential.user.photoURL,
        email: userCredential.user.email,
        provider: 'google',
        isAdmin: false, // Set isAdmin to false by default
        isPayment: false, // Set isPayment to false by default
        signupDate: currentDate ,// Include the current date
        gender:"",
        age:"",
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export const getCurrentUser = () => {
  return getUserFromLocalStorage();
};


export const signInWithGithub = async () => {
  try {
    await signInWithPopup(auth, githubProvider); // Open Facebook Sign-In popup
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup
  }, []);



  return (
    <AuthContext.Provider value={{ currentUser,  getCurrentUser, login, signup, logout ,signInWithGoogle,signInWithGithub}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
