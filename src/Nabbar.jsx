import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-blue-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-2xl font-bold">
                        <Link to="/">UniFinder</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                        <Link to="/about" className="hover:text-gray-200 transition">About</Link>
                        <Link to="/contact" className="hover:text-gray-200 transition">Contact Us</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
