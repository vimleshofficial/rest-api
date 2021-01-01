import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import {registreValodation,loginValodation} from './validation.js'
import bcrypt from 'bcryptjs'


//Submit New User 
const newUser=async(req,res)=>{    

    //Validate user data
    const {error}= registreValodation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message}); 

    //Hash the password
    const salt=await bcrypt.genSalt(10);
    const hasPassword=await bcrypt.hash(req.body.password,salt);
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hasPassword
    });
    
    try{ 
        //Checking User exist
        const emailExist=await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).send({message:"Email already exist"});    
        
        const saveUser=await user.save();
        if(!saveUser) return res.status(400).send({message:'User not save'});
        res.status(200).send({user:user._id});

    }catch(err){
        res.status(400).send({error:err});
    }
   
}
//Login user
const loginUser=async(req,res)=>{
    //Validate user data
    const {error}= loginValodation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message}); 
    try{
        //Checking User exist
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send({message:"Email or password is wrong."});  

        //Password is currect
        const validPass=await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).send({message:"Email or password is wrong"});         
        //Create and assing a token
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        
        res.header('auth-token',token).send(token);

    }catch(err){
        //console.log(err);
        res.status(400).send({error:err});        
    }
}

export {newUser,loginUser};