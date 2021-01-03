import express from 'express';
import {getPost,newPost,specificPost,deletePost,updatePost,likePost} from '../controller/post.js';
import verify from '../routes/verifyToken.js'
const router=express.Router();

//Get All posta
router.get('/',getPost);
//Submit New Post
router.post('/',newPost);
//Specific post
router.get('/:postId',specificPost);
//Delete Specific post
router.delete('/:postId',deletePost);
//Update A post
router.patch('/:postId',updatePost);
//Like Post
router.patch('/:postId/likePost',likePost);

export default router;