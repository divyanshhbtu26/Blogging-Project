import config from '../config/config'
import {Client , Databases, Storage , Query , ID } from "appwrite"

export class Service{
    client = new Client ();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket = new Storage (this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: error",error);
            
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Updation service :: error",error);
            
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Failed Deleting",error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Cannot get you post",error);
            return false
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    //File upload services:---
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("file upload failed",error);
            
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Deletion failed",error);
            
        }
    }
    async getFilePreview(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Deletion failed",error);
        }
    }
}
const service= new Service()
export default service