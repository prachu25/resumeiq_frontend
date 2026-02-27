import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    // STATES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // REGISTER FUNCTION
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setIsError(true);
            setMessage("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            setIsError(true);
            setMessage("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/register`, {
                name,
                email,
                password,
            });

            // Do NOT store in localStorage
            localStorage.clear();

            setIsError(false);
            setMessage("Registration successful. Please login.");

            // Redirect to Login page after 1 second
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {
            localStorage.clear();
            setIsError(true);
            setMessage("Registration failed. Email may already exist.");
        }
    };

    return (
        <div className='bg-indigo-50 min-h-screen flex items-center justify-center px-4 text-white'>
            <div className='w-full max-w-md p-7 bg-indigo-100 rounded-2xl'>
                <h2 className='text-3xl md:text-4xl font-bold text-indigo-600 mb-4 text-center'>Register</h2>

                <p className='text-gray-500 text-center mb-6 text-sm md:text-base'>
                    Already have an account? Login here
                </p>

                <form className="space-y-4" onSubmit={handleRegister}>

                    {/* NAME */}
                    <div className="flex items-center rounded-xl px-4 py-3 bg-indigo-50">
                        <FaUser className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full outline-none text-sm md:text-base text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center rounded-xl px-4 py-3 bg-indigo-50">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <input
                            type="email"
                            placeholder="john@gmail.com"
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

                    {/* REGISTER BUTTON */}
                    <button
                        type="submit"
                        className="w-full mt-2 bg-indigo-600 hover:rounded-full active:scale-95 transition duration text-white py-2 rounded-xl font-semibold"
                    >
                        Register
                    </button>

                    {/* MESSAGE */}
                    {message && (
                        <p className={`text-center text-sm mt-2 ${isError ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    )}

                    <Link
                        to="/"
                        className="block text-center text-gray-500 text-sm mt-4 hover:scale-90 transition duration-200"
                    >
                        Have an account? Login to continue
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default Register;