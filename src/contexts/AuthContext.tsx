import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "../types/user";

const AuthContext = createContext(["", {}])

function AuthProvider(props: any) {
    const hash = window.location.hash
    let token = "" 
    if(hash) {
        token = hash?.substring(1)?.split("&")?.find(elem => elem.startsWith("access_token"))?.split("=")[1] as string
    }

    const [user, setUser] = useState<User>({})

    const getUserData = useCallback(async () => {
        let userData = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setUser(userData.data)
    }, [props.token])

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <AuthContext.Provider value={[token, user]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }