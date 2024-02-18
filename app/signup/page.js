"use client"
import { useContext, useState } from 'react';
import { signup, signInWithGoogle, AuthContext } from '@/Provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link from Next.js
import { FaGoogle } from 'react-icons/fa';

export default function SignupPage() {
    const [inputEmail, setInputEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState(''); // Initialize with empty string
    const [age, setAge] = useState(0); // Initialize with default value
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        setError(''); // Clear error state
        e.preventDefault();
        setError(''); // Clear error state
        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }
        if (age === 0) {
            setError("Please enter your age");
            return;
        }
        try {
            await signup(inputEmail, password, username, gender, age); // Include gender and age in signup
            await router.push('/subscribe');
            toast.success("Signup successfully");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(''); // Clear error state
        try {
            await signInWithGoogle();
            await router.push('/subscribe');
            toast.success("Signup successfully");
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError("Sign-in process was closed by the user. Please try again.");
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="login-container flex items-center justify-center min-h-screen" style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://i.ibb.co/m8KT5fz/hero-bg.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maxHeight: "100vh"
          }}>
            <div className="max-w-md w-full space-y-8 border border-spacing-1 p-4 rounded-md backdrop-blur-md bg-opacity-75 bg-black">
                <div>
                    <h1 className="text-3xl font-bold text-center text-white">Sign Up</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form className="mt-8 space-y-4" onSubmit={handleSignup}>
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter your name'
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-gray-300 border-gray-300"
                            />
                        </div>
                        <div>
                            <input
                                id="inputEmail"
                                name="inputEmail"
                                type="email"
                                autoComplete="inputEmail"
                                placeholder='Enter your email'
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-gray-300 border-gray-300 "
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder='Enter your new-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-gray-300 border-gray-300"
                            />
                        </div>
                        <div>
                            <input
                                id="retypePassword"
                                name="retypePassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder='Enter your retype new-password'
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-gray-300 border-gray-300 "
                            />
                        </div>
                        <div>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm bg-opacity-50 bg-white text-gray-300 border-gray-300 "
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                value={age}
                                placeholder='Enter your age'
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                required
                                className="mt-1 focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm placeholder-white bg-opacity-50 bg-white text-gray-300 border-gray-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium border-gray-300 placeholder-gray-500 text-gray-300 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center w-full justify-center gap-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-gray-300 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <FaGoogle />
                            Sign Up with Google
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span className='text-gray-300'> Already have an account?</span> <Link href="/login"><span className="text-red-600 font-medium hover:text-red-400">Sign in</span></Link>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
