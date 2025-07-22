import React, { useState } from 'react';
import Component1 from './Component1';

const Counter = () => {
// Declare state variable
console.log("Counter rendered");
const [count, setCount] = useState(10);
return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        <Component1 count={count} />
    </div>
);
}

export default Counter;