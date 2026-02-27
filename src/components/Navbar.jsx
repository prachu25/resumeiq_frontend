import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full bg-indigo-50 shadow-sm'>

            <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>

                {/* Logo */}
                <h1 className='text-2xl font-bold text-indigo-600 tracking-wide'>
                    ResumeIQ
                </h1>

                {/* Button */}
                <button className='px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                                   text-white font-semibold rounded-full 
                                   '>
                    Upload Resume
                </button>

            </div>

        </nav>
    )
}

export default Navbar