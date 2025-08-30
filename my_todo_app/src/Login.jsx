import React, { useState } from 'react';

const Login = ({loginUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {username:username, password:password};  
        loginUser(user);
        //setUsername('');
        //setPassword('');
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
    
    <div>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
            </div>
            
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            
            <button type="submit">Login</button>
            
        </form>
    </div>
    );
};
export default Login;