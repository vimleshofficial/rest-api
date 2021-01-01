import Post from '../models/Post.js';
//Get All Posts
const getPost=async(req,res)=>{
    try{
        const posts=await Post.find();
        if(!posts) return res.status(400).send({message:'No any available'});
        res.status(200).send(posts);

    }catch(err){
        res.status(400).send({error:err});        
    }
}
//Get Specific Post
const specificPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.postId);
        if(!post) return res.status(400).send({message:'Post Not Found'});
        res.status(200).send(post);

    }catch(err){
        res.status(400).send({error:err});        
    }
}

//Submit New Post 
const newPost=async(req,res)=>{
    const post= new Post({
        title:req.body.title,
        description:req.body.description
    });
    
    try{
        const savePost=await post.save();
        if(!savePost) return res.status(400).send({message:'Your post not save'});
        res.status(200).send(savePost);

    }catch(err){
        res.status(400).send({error:err});
    }
   
}

//Delete Specific Post
const deletePost=async(req,res)=>{
    try{
        const postRemove=await Post.remove({_id:req.params.postId});
        if(!postRemove) return res.status(400).send({message:'Post Not Found'});
        res.status(200).send(postRemove);

    }catch(err){
        res.status(400).send({error:err});        
    }
}

//Update a Post 
const updatePost=async(req,res)=>{
   console.log(req.params.postId);
    try{
        const updatePost=await Post.updateOne(
                {_id:req.params.postId},
                {$set:{ title:req.body.title}}
                );
        if(!updatePost) return res.status(400).send({message:'Your post not exist'});
        res.status(200).send(updatePost);

    }catch(err){
        res.status(400).send({error:err});
    }
   
}
export {getPost,newPost,specificPost,deletePost,updatePost};