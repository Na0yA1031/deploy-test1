import { createContext, useState, useEffect } from "react"
import { auth } from "./firebase"

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(false)
    console.log(authUser)

    useEffect(() => {
        const getAuthUser = async () => {
            await auth.onAuthStateChanged(user => {
                setAuthUser(user)
            })
        }
        getAuthUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider,
}
