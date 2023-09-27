import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new error("el useAuth deberia de estar en el provider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [erro, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
            setError(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setError(error.response.data)
            }
            setError([error.response.data.message])
        }
    };

    const logout = () =>{
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
    }

    useEffect(() => {
        if (erro.length > 0) {
            const timer = setTimeout(() => {
                setError([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [erro])

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookies.get()
            console.log(cookies);

            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false);
                return setUser(null);
            }
                try {
                    const res = await verityTokenRequest(cookies.token);
                    console.log(res);
                    if(!res.data) {
                        setIsAuth(false);
                        setLoading(false);
                        return;
                    }

                    setIsAuth(true);
                    setUser(res.data);
                    setLoading(false);
                } catch (error) {
                    setIsAuth(false);
                    setUser(null);
                    setLoading(false);
                }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, user, isAuth, erro, signin, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )

}