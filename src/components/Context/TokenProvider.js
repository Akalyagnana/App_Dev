import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = 'http://localhost:8000/token/'; 

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.post(apiUrl, {
                    username: 'gohul',  
                    password: 'gohul',  
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setToken(response.data.access); 
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
