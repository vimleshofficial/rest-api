import express from 'express';
import {getPost,newPost,specificPost,deletePost,updatePost,likePost} from '../controller/post.js';
import verify from '../routes/verifyToken.js'
const router=express.Router();

//Get All posta
router.get('/',getPost);
//Submit New Post
router.post('/',verify,newPost);
//Specific post
router.get('/:postId',verify,specificPost);
//Delete Specific post
router.delete('/:postId',verify,deletePost);
//Update A post
router.patch('/:postId',verify,updatePost);
//Like Post
router.patch('/:postId/likePost',verify,likePost);

export default router;