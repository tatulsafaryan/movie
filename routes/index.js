const express = require('express');
const sha256 = require('js-sha256').sha256;

const constansts = require('../config/constans');
const userController = require('../controllers/userController');
const movieController = require('../controllers/movieController');


const TokenGenerator = require( 'token-generator' )({
    salt: constansts.TOKEN_GENERATOR_SALT,
    timestampMap: constansts.TOKEN_GENERATOR_TIMESTAMP_MAP
  });


const router = express.Router();

                //////USERS CRUD//////

router.post('/user/add',async(req,res)=>{
    try{
        let token = TokenGenerator.generate()
        let userData = {
            Login: req.body.login,
            Password: sha256(req.body.password),
            Fullname: req.body.fullname,
            Token:token
        }
        let insData =await userController.addUser(userData);
        res.status(200).json(insData);
    }catch(err){
        return res.status(500)
    }
})

router.get('/user',async (req,res)=>{
    try{
        let usersData = await userController.getAllUser();
        if(!usersData){
            res.send('Invalid Data');
        }
        res.status(200).json(usersData);
    }catch(err){
        return res.status(500);
    }
})

router.delete('/user/delete/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        let deletedUser = await userController.deleteUser(id);
        if(!deletedUser){
            res.send('Invalid user')
        }
        await movieController.deleteAny(deletedUser);
        res.status(200).json(deletedUser);
    }catch(err){
        return res.status(500);
    }
})

router.put('/user/update/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        if(!id){
            res.send('Invalid Id')
        }
        let updatedUser = await updatedUser(id);
        res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500);
    }
})

                 //////MOVIES CRUD//////


router.get('/movie', async(req,res)=>{
    try{
        let allData = await movieController.getAllData()
        res.status(200).json(allData);
    }catch(err){
        return res.status(500)
    }
})

router.get('/movie/:id', async(req,res)=>{
    try{
        let id = req.params.id
        let data = await movieController.getData(id);
        res.status(200).json(data);
    }catch(err){
        return res.status(500)
    }
})
//////Middleware for geting user by token for movies//////

function userByToken(){
    return async function(req, res, next){

        let token = req.get('token');
        if(!token){
            res.send('Permission denied')
         }
        let user = await userController.getUserByToken(token);
        if(!user){
             next();
        }
        req.user = user;
         next();
       }
}

router.post('/movie/add',userByToken(),async(req,res) => {
    try{
        if(!req.user){
            res.send('Invalid token');
        }
        let data = {
            Name: req.body.Name,
            Rating:req.body.Rating,
            Release_Date: req.body.Release_Date,
            Directors: req.body.Directors,
            Author:req.user._id
        }
        let insData =await movieController.addMovie(data);
        res.status(200).json(insData);
    }catch(err){
        return res.status(500)
    }
})



router.put('/movie/update/:id',userByToken(),async(req,res) =>{
    try{
        if(!req.user){
            res.send('Invalid token');
        }
        let id = req.params.id;
        let criteria = {
            id:id,
            userId:req.user._id
        }
        let upData = req.body;
        let data = await movieController.updatData(criteria,upData);
        res.status(200).json(data)
    }catch(err){
        return res.status(500)
    }
})

router.delete('/movie/delete/:id',userByToken(),async(req,res)=>{
    try{
        if(!req.user){
            res.send('Invalid token');
        }
        let id = req.params.id;
        let criteria = {
            id: id,
            userId:req.user._id
        }
        let data = await movieController.deleteData(criteria)
        res.status(200).json(data)
    } catch(err){
        return res.status(500)
    }

})

module.exports = router;