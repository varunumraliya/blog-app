const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

//router obj
const router = express.Router();

//routes
// all blogs || GET
router.get('/all-blog', getAllBlogController)

//create blog || POST
router.post('/create-blog', createBlogController)

//update blog || PUT
router.put('/update-blog/:id', updateBlogController)

//single blog detail || GET
router.get('/get-blog/:id', getBlogByIdController)

//delete blog || DELETE
router.delete('/delete-blog/:id', deleteBlogController)

//user blog || GET
router.get('/user-blog/:id' ,userBlogController)

module.exports = router;