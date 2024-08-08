import UserContext from "./UserContext"
import { useState } from "react";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (username) => {
        setUser(username)
    }
    const logout = () => {
        setUser(null);
    }
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>

    )
}
export default UserProvider;