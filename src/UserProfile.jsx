import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

const UniverisityProfile = () => {
    const [univeristy, setUniveristy] = useState("mora");
    const [univeristyData, setUniveristyData] = useState([]);
    const [count, setCount] = useState(0);

    const context = useContext(UserContext);
    console.log("Context:", context);

    useEffect(() => {
        const fetchUniversityData = async () => {
            try {
                const response = await axios.get(`http://universities.hipolabs.com/search?name=${univeristy}`);
                console.log("User data fetched:", response.data);
                setUniveristyData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUniversityData();
    }, [univeristy]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* {context.counter}

            <button onClick={() => context.incrementCounter()} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
                Increment Counter
            </button>

            <button onClick={() => context.decrementCounter()} className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 ml-2">
                Decrement Counter
            </button> */}

            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">University Search</h1>

                <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter university name"
                        value={univeristy}
                        onChange={(e) => {
                            console.log('Input changed:', e.target.value);
                            setUniveristy(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => setCount(count + 1)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Clicked ({count})
                    </button>
                </div>

                <div className="space-y-6">
                    {univeristyData && univeristyData.length > 0 ? (
                        univeristyData.map((uni, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">{uni.name}</h2>
                                <p className="text-sm text-gray-600">Country: {uni.country}</p>
                                <div className="mt-2">
                                    {uni.web_pages.map((web, idx) => (
                                        <a
                                            key={idx}
                                            href={web}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline block text-sm"
                                        >
                                            {web}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No universities found for "{univeristy}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UniverisityProfile;
