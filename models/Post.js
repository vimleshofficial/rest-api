import mongoose from 'mongoose';


const PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    creator: {
        type:mongoose.Schema.Types.ObjectId,
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
    type: {
        type: String,
        enum : ['public','private'],
        default: 'public'
    },
    date:{
        type:Date,
        default:Date.now
    } 
});

export default mongoose.model('Posts',PostSchema);