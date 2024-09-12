import { useState, useEffect } from 'react';

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Update localStorage whenever isLoggedIn changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return { isLoggedIn, handleLogin, handleLogout };
};

export default Auth;
