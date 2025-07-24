import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10">
                <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">About This App</h1>

                <p className="text-gray-700 text-lg mb-4">
                    Welcome to the <span className="font-semibold text-blue-600">University Finder</span> app!
                    This application helps users search for universities around the world using the{' '}
                    <a 
                        href="http://universities.hipolabs.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline"
                    >
                        Hipolabs Universities API
                    </a>.
                </p>

                <p className="text-gray-700 text-lg mb-4">
                    Just enter a university name in the search box, and you'll get a list of matching universities along with their countries and official websites.
                </p>

                <p className="text-gray-700 text-lg mb-4">
                    This project is built using modern web technologies like:
                </p>

                <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                    <li><span className="font-medium text-blue-600">React</span> – for building user interfaces</li>
                    <li><span className="font-medium text-blue-600">Axios</span> – for fetching API data</li>
                    <li><span className="font-medium text-blue-600">Tailwind CSS</span> – for styling and responsive design</li>
                </ul>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">Made with ❤️ by [Your Name or Team]</p>
                </div>
            </div>
        </div>
    );
};

export default About;
