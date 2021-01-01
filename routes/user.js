import express from 'express';
import {newUser,loginUser} from '../controller/user.js';

const router=express.Router();


//Submit New User
router.post('/register',newUser);
//Login User
router.post('/login',loginUser);


export default router;