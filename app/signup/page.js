"use client"
import { useContext, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link from Next.js
import { FaGoogle } from 'react-icons/fa';

import { AuthContext } from '@/Provider/AuthProvider';


export default function SignupPage() {
    const [inputEmail, setInputEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState(''); // Initialize with empty string
    const [country, setCountry] = useState(''); // Initialize with empty string
 
    const [age, setAge] = useState(''); // Initialize with default value
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { signup, signInWithGoogle } = useContext(AuthContext)

    const handleSignup = async (e) => {
        setError(''); // Clear error state
        e.preventDefault();
        setError(''); // Clear error state
        if (password !== retypePassword) {
            setError("Passwords do not match");
            return;
        }
        if (age === '') {
            setError("Please enter your age");
            return;
        }
        try {
            await signup(inputEmail, password, username, gender,age, country); // Include gender and age in signup
            toast.success("Signup successfully");

            await router.push('/home');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    const handleGoogleSignIn = async () => {
        setError(''); // Clear error state
        try {
            await signInWithGoogle();

            await router.push('/home');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state back to false
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
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
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
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
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
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
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
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
                            />
                        </div>
                        <div>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
                            >

                                <option value="" style={{ color: "black" }}>Select Gender</option>
                                <option value="male" style={{ color: "black" }}>Male</option>
                                <option value="female" style={{ color: "black" }}>Female</option>

                            </select>
                        </div>
                        <div>
                            <select
                                id="country"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm "
                            >
                                <option value="" style={{ color: "black" }}>Select Country</option>
                                <option value="bangladesh" style={{ color: "black" }}>Bangladesh</option>
                                <option value="india" style={{ color: "black" }}>India</option>
                                <option value="turkey" style={{ color: "black" }}>Turkey</option>
                                <option value="pakistan" style={{ color: "black" }}>Pakistan</option>
                                <option value="koria" style={{ color: "black" }}>Koria</option>
                                <option value="united-states" style={{ color: "black" }}>United-states</option>
                                <option value="china" style={{ color: "black" }}>China</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-medium text-white">
                                Birthdate
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="date"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="mt-1 focus:ring-indigo-500 rounded-lg text-white px-3 py-2 bg-white bg-opacity-20 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium border-gray-300 placeholder-gray-500 text-gray-300 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Signup In...' : 'Sign up'}
                            </button>
                        </div>

                    </form>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center w-full justify-center gap-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-gray-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
