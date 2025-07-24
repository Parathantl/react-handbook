import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [counter, setCounter] = useState(0);
    
    const login = (userData) => {
        setUser(userData);
    };
    
    const logout = () => {
        setUser(null);
    };

    const incrementCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    }

    const decrementCounter = () => {
        setCounter(prevCounter => prevCounter - 1);
    }
    
    return (
        <UserContext.Provider value={{ user, login, logout, counter, incrementCounter, decrementCounter }}>
        {children}
        </UserContext.Provider>
    );
}