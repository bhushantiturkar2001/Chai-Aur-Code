import axios from "axios";
import conf from "../conf/conf.js";

// axios instance with base URL
const api = axios.create({
    baseURL: conf.baseUrl,
});

// attach JWT token to every request automatically
api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = "Bearer " + token;
    }
    return req;
});

export class AuthService {

    // POST /api/auth/register  →  { name, email, password }  →  { token }
    async createAccount({ email, password, name }) {
        try {
            const res = await api.post("/auth/register", { name, email, password });
            localStorage.setItem("token", res.data.token);
            // after register, fetch the full user profile
            return this.getCurrentUser();
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    // POST /api/auth/login  →  { email, password }  →  { token }
    async login({ email, password }) {
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    // GET /api/auth/profile  →  returns { id, name, email }
    async getCurrentUser() {
        try {
            const res = await api.get("/auth/profile");
            // normalize to Appwrite-style shape used across the app
            return {
                $id: String(res.data.id),
                name: res.data.name,
                email: res.data.email,
            };
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    // logout — just clear the token (no backend call needed)
    async logout() {
        localStorage.removeItem("token");
    }
}

const authService = new AuthService();

export default authService;
