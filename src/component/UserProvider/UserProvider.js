import { useState, createContext } from 'react';

const UserContext = createContext();
function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const handleChangeUserData = (userData) => {
        setUser(userData);
    };
    const value = {
        user, 
        handleChangeUserData,
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider};
