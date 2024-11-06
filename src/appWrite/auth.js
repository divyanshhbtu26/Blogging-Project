import config from '../config/config.js'
import {Client , Account , ID } from "appwrite"

export class AuthService {
    client = new Client ()
    account ;

    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.account=new Account (this.client)
    }

    async createAccount ({email, password , name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    // async getCurrentUser(){
    //     try {
    //         return await this.account.get();
    //     } catch (error) {
    //         console.log("AppWrite service :: getCurrentUser :",error);
            
    //     }
    //     return null;
    // }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user:", user);
            return user;
        } catch (error) {
            console.log("AppWrite service :: getCurrentUser :", error);
            return null;
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Some Problem Occured ",error);
            
        }
    }

}

const authService = new AuthService();

export default authService



// // Example usage to authenticate and fetch current user
// (async () => {
//     try {
//         const user = await AuthService.login({ email: 'newuser@example.com', password: 'securepassword' });
//         if (user) {
//             const currentUser = await AuthService.getCurrentUser();
//             console.log("Authenticated User:", currentUser);
//         }
//     } catch (error) {
//         console.error("Error during authentication:", error);
//     }})