import { createContext } from "react";

const AuthContext = createContext("")

function AuthProvider(props: any) {
    const token = new URLSearchParams(window.location.search).get("code") as string
    return (
        <AuthContext.Provider value={token}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }