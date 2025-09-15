import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({addUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {username:username, password:password, email:email};  
        addUser(user);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
    
    <div>
        <h2>Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
            </div>
            
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>

             <div>
                <label htmlFor="password">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange}/>
            </div>
            
            <button type="submit">Sign up</button>
            
        </form>
        <Link to='/login'>Already signed up ?</Link>
    </div>
    );
};
export default SignUp;