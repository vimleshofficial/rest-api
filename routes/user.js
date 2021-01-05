import express from 'express';
import {newUser,loginUser,getUser} from '../controller/user.js';
import verify from '../routes/verifyToken.js'

const router=express.Router();

//Get User
router.get('/',verify,getUser);
//Submit New User
router.post('/register',newUser);
//Login User
router.post('/login',loginUser);


export default router;