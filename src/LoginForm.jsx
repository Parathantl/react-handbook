import { useState } from "react";

const LoginForm = () => {
    console.log("LoginForm rendered");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", username);
  };

  const handleChange = (e) => {
    console.log("Changed:", e.target.value);
    setUsername(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="Enter username"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
