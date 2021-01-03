import mongoose from 'mongoose';


const PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    creator: {
        type:String,
        required:true
    },
    tags: [String],
    description:{
        type:String,
        required:true
    },
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    date:{
        type:Date,
        default:Date.now
    } 
});

export default mongoose.model('Posts',PostSchema);