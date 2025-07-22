import axios from 'axios';
import React, { useState, useEffect } from 'react';
// React Context & React Router
const UniverisityProfile = () => {
    const [univeristy, setUniveristy] = useState("mora"); // Input state for university name
    const [univeristyData, setUniveristyData] = useState([]); // State to hold fetched university data
    const [count, setCount] = useState(0);

    useEffect(() => {

        // fetch(`http://universities.hipolabs.com/search?name=${univeristy}`).then((response) => {
        //     return response.json();
        //     }).then((data) => {
        //         console.log("User data fetched:", data);
        //         setUniveristyData(data)
        //     }).catch((error) => {
        //         console.error("Error fetching user data:", error);
        //     })

        const uniDat = async () => {
            const response = await axios.get(`http://universities.hipolabs.com/search?name=${univeristy}`);
            console.log("User data fetched:", response.data);
            setUniveristyData(response.data);
        }

        uniDat();

    }, [univeristy]);

    return (
        <>

            {count}
            <button onClick={() => {
                console.log('Button clicked');
                setCount(count + 1);
            }}>clicked</button>

            <br/>
            <br/>
            <input 
                type='text'
                placeholder='Enter your name'
                onChange={(e) => {
                    console.log('Input changed:', e.target.value);
                    setUniveristy(e.target.value);
                }}
                />
             <br/>
            <br/>
            {univeristyData && univeristyData.map((uni, index) => {
                return (
                    <div key={index}>
                        <h2>{uni.name}</h2>
                        <p>{uni.country}</p>
                        <div>
                            {uni.web_pages.map((web) => {
                                return (
                                    <p>{web}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            }
            )}
        </>
    )
};

export default UniverisityProfile;