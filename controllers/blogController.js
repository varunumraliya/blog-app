const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//get all blog
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'no blogs found',
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:'All blogs list',
            blogs,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error While getting blog',
            error
        })
    }
}

//create blog
exports.createBlogController = async (req,res) => {
    try {
        const {title, description, image, user} = req.body
        //validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:'Please provide all fields',
            })
        }
        const existingUser = await userModel.findById(user)
        //validation
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'Unable to find user',
            })
        }
        const newBlog = new blogModel({title, description, image, user});
        await newBlog.save();
        existingUser.blogs.push(newBlog);
        await existingUser.save();
        return res.status(201).send({
            success:true,
            message:'Blog created!',
            newBlog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error while creating blog',
            error
        })
    }
}

//update blog
exports.updateBlogController = async( req,res) => {
    try {
        const {id} = req.params;
        const {title, description, image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body}, {new:true})
        return res.status(200).send({
            success:true,
            message:'Blog updated!',
            blog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error While updating blog',
            error
        })
    }
}

//single blog detail
exports.getBlogByIdController = async (req,res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'Blog not found by this id',
            })
        }
        return res.status(200).send({
            success:true,
            message:'fetch single blog',
            blog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error While getting single blog',
            error
        })
    }
}

//delete blog
exports.deleteBlogController = async(req,res) => {
    try {
        const blog = await blogModel
        .findOneAndDelete(req.params.id)
        .populate("user")
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:'Blog Deleted!',
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error While deleting blog',
            error
        })
    }
}

//get user blog
exports.userBlogController = async(req,res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blog not found by this id',
            })
        }
        return res.status(200).send({
            success:true,
            message:'user blog',
            userBlog,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'error in user blog',
            error,
        })
    }
}