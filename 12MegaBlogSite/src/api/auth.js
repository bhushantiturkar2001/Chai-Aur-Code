import axios from "axios"
import config from "../config/conf"

// create axios 
const api = axios.create({
    baseURL: config.baseUrl,
});


// add token automatically 
api.interceptors.request.use((req)=>{
   const token = localStorage.getItem("token");
   if(token){
    req.headers.Authorization = "Bearer " + token
   }
   return req;
});

// register 
export const createAccount = async({email,password,name})=>{
    await api.post("/auth/register",{
    email,
    password,
    name
   });

   // optional:: auto login after reg
   return login({email,password});
};

// login
export const login = async({email,password})=>{
    const res = await api.post("/auth/login",{
       email,
       password
    });

    localStorage.setItem("token", res.data.token);
    return res;
};

// get current user
export const getCurrentUser = async()=>{
    try{
       const res = await api.get("/auth/profile");
       return res.data;
    }catch(error){
       console.log("Error to fetch user", error);  
    }
    return null;
};

// logout
export const logout = () => {
    localStorage.removeItem("token");
}





/* 
 
// Appwrite Way

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

 */