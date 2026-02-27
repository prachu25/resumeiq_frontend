import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/api";

const Login = () => {

    const navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setIsError(true);
            setMessage("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
            });

            // If login successful
            if (res.data.userId) {

                // Save new login data
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("email", res.data.email);

                setIsError(false);
                setMessage(res.data.message);

                setTimeout(() => {
                    navigate("/analyze");
                }, 800);

            } else {
                // If backend response not valid
                localStorage.clear();
                setIsError(true);
                setMessage("Invalid credentials");
            }

        } catch (err) {
            // Clear old login data on error
            localStorage.clear();
            setIsError(true);
            setMessage("Invalid email or password");
        }
    };
    return (
        <div className='bg-indigo-50 min-h-screen flex items-center justify-center px-4 text-white'>
            <div className='w-full max-w-md p-7 bg-indigo-100 rounded-2xl'>
                <h2 className='text-3xl md:text-4xl font-bold text-indigo-600 mb-4 text-center'>Login</h2>

                <p className='text-gray-500 text-center mb-6 text-sm md:text-base'>
                    Don't have an account? create account,
                    <br /> it take a less than minute
                </p>

                <form className="space-y-4" onSubmit={handleLogin}>

                    {/* EMAIL */}
                    <div className="flex items-center rounded-xl px-4 py-3 bg-indigo-50">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input
                            type="email"
                            placeholder="youremail@gmail.com"
                            className="w-full outline-none text-sm md:text-base text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="flex items-center rounded-xl px-4 py-3 bg-indigo-50 mb-2">
                        <FaLock className="text-gray-400 mr-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full outline-none text-sm md:text-base text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 ml-2"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-full mt-2 bg-indigo-600 hover:rounded-full active:scale-95 transition duration text-white py-2 rounded-xl font-semibold"
                    >
                        Login
                    </button>

                    {/* MESSAGE */}
                    {message && (
                        <p className={`text-center text-sm mt-2 ${isError ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    )}

                    <Link
                        to="/register"
                        className="block text-center text-gray-500 text-sm mt-4 hover:scale-90 transition duration-200"
                    >
                        Don't have an account? Create one
                    </Link>

                </form>
            </div>
        </div>
    );
};

export default Login;