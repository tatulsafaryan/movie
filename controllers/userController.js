const mongoose = require('mongoose');
const userModel = require('../models/user')


module.exports = {

    async addUser (data){ 
        try{
            let newUserModel = new userModel(data)
            let insertedData = await newUserModel.save()
            return insertedData;
        }catch(error){
            throw new Error('Create user error');
        }
    },

    async getUserByToken(token){
        try{
            let userData = await userModel.findOne({Token:token})
            return userData;
        }catch(error){
            throw new Error('Get user by token error');
        }
    },

    async getAllUser(){
        try{
            let usersData = await userModel.find();
            return usersData
        }catch(error){
            throw new Error('Get error');
        }
    },
    async deleteUser(id){
        try{
            let deletedUser = await userModel.findOneAndDelete({_id:id});
            if(deletedUser)
                return deletedUser;
            return
        }catch(error){
            throw new Error('User Delete error');
        }
    },
    async updatedUser(id){
        try{
            let updatedUser = await updateOne({_id:id});
            return updatedUser;
        }catch(error){
            throw new Error('User Update error');
        }
    }
}