import { createContext, useContext, useEffect, useState } from "react" 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({children}) => {

    const navigate = useNavigate()
    const [token, setToken] = useState(null)       // regular user token
    const [user, setUser] = useState(null)
    const [adminToken, setAdminToken] = useState(null)  // admin token (separate)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.post('/api/user/profile', {}, {
                headers: {'Authorization': localStorage.getItem('token')}
            })
            if(data.success) setUser(data.user)
        } catch (error) {
            console.error(error.message)
        }
    }

    // Always reads fresh from localStorage — immune to header conflicts
    const adminAxiosConfig = () => ({
        headers: { 'Authorization': localStorage.getItem('adminToken') }
    })

    useEffect(() => {
        fetchBlogs()
        const savedToken = localStorage.getItem('token')
        if(savedToken) {
            setToken(savedToken)
            axios.defaults.headers.common['Authorization'] = savedToken
            fetchUserProfile()
        }
        const savedAdminToken = localStorage.getItem('adminToken')
        if(savedAdminToken) setAdminToken(savedAdminToken)
    }, [])

    const value = {
        axios, navigate,
        token, setToken,
        user, setUser,
        adminToken, setAdminToken,
        adminAxiosConfig,
        blogs, setBlogs,
        input, setInput,
        fetchUserProfile
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}