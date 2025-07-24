import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-2xl font-bold">
                        <a to="/">UniFinder</a>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <a to="/" className="hover:text-gray-200 transition">Home</a>
                        <a to="/about" className="hover:text-gray-200 transition">About</a>
                        <a to="/contact" className="hover:text-gray-200 transition">Contact Us</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
