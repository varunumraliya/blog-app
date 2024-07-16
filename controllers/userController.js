const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
//create user register user
exports.registerController = async (req,res) =>{
    try {
        const { username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'please fill all feilds.'
            })
        }
        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:'user alread exist'
            })
        }
        const hashedPassword = await bcrypt.hash(password,8)
        //save new user
        const user = new userModel({username,email,password:hashedPassword})
        await user.save()
        return res.status(201).send({
            success:true,
            message:'new user created',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:'Error in Register callback',
            success: false,
            error
        })
    }

};

//get all users 
exports.getAllUser = async(req, res) =>{
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            usersCount: users.length,
            success:true,
            message:'all users data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Get All User',
            error
        })
    }
};


//login
exports.loginController = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'please provide email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:'email is not register'
            })
        }
        //password checking
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid username or password'
            })
        }
        return res.status(200).send({
            success:true,
            message:'login successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Login callback',
            error
        })
    }
};