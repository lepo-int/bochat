import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Apis";
import {signupUser} from "../Apis";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    const [token, setToken] = useState(localStorage.getItem("site") || " ");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const res = await loginUser(data);
            if (res.message === "Invalid credentials") {
                toast.error("Invalid credentials!")
                return;
            }
            else if(res.message === "Login successful") {
                toast.success("Login Successful!")
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const signupAction = async (data) => {
        try {
            const res = await signupUser(data);
            if (res.message === "User registered successfully") {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("site", res.token);
                navigate("/dashboard");
                return;
            }
            else if(res.message === "User already exists") {
                toast.error("User already exists!")
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };
    
    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{token, user, loginAction, signupAction, logOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};