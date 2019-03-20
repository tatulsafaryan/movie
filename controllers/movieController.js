const mongoose = require('mongoose');

const movieModel = require('../models/movie')

module.exports = {
    async addMovie (data){ 
        try{
            let newMovieModel = new movieModel(data)
            let insertedData = await newMovieModel.save()
            return insertedData;
        }catch(error){
            throw new Error('Create error');
        }
    },

    async getAllData() {
        try{
            let allData = await movieModel.find()
            return allData;
        }catch(error){
            throw new Error('Get movies error');
        }
    },

    async getData(id){
        try{
            let data = await movieModel.findById({_id:id});
            return data;
        }catch(error){
            throw new Error('Get one movie error');
        }
    },
    async updatData(criteria,updata) {
        try{
            let data = await movieModel.updateOne({_id:criteria.id,Author:criteria.userId},updata);
            return data;
        } catch(error){
            throw new Error('Update movie error');
        }
    },

    async deleteData(criteria){
        try{
            let data = await movieModel.findOneAndDelete({_id:criteria.id,Author:criteria.userId})
            if(data)
                return data;
            return "Invalid data";
        }catch(error){
            throw new Error('Delete movie error');
        }
    },

    async deleteAny(user){
        try{
            let deletedMovies = await movieModel.deleteMany({Author:user._id})
            return deletedMovies;
        }catch(error){
            throw new Error(`Delete ${user.Fullname} user's all movies error`);
        }
    }
}