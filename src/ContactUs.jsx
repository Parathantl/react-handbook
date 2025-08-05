import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const ContactUs = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const context = useContext(UserContext)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        alert('Message submitted! Thank you.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 px-6">

            {/* {context.counter}

            <button onClick={() => context.incrementCounter()} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
                Increment Counter
            </button>

            <button onClick={() => context.decrementCounter()} className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 ml-2">
                Decrement Counter
            </button> */}

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-10">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
