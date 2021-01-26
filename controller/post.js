import { Post } from "../models/index.js";

//Get All Posts
const getPost = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "userinfo",
        },
      },
    ]);
    //const posts=await Post.find();
    if (!posts) return res.status(401).send("No any available");

    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//Get Specific Post
const specificPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(401).send("Post Not Found");
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Submit New Post
const newPost = async (req, res) => {
  const post = new Post({
    creator: req.user.id,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    selectedFile: req.body.selectedFile,
    type: req.body.type,
  });

  try {
    const savePost = await post.save();
    if (!savePost) return res.status(401).send("Your post not save");
    res.status(200).send(savePost);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete Specific Post
const deletePost = async (req, res) => {
  const _id = req.params.postId;
  try {
    const postRemove = await Post.findByIdAndRemove(_id);
    if (!postRemove) return res.status(401).send("Post Not Found");
    res.status(200).send(postRemove);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update a Post
const updatePost = async (req, res) => {
  const post = req.body;
  const _id = req.params.postId;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    if (!updatePost) {
      return res.status(401).send("Your post not exist");
    }
    ///console.log(updatePost);
    res.status(200).send(updatePost);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//like post
const likePost = async (req, res) => {
  const _id = req.params.postId;
  try {
    const post = await Post.findById(_id);
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(401).send("Your post not exist");
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(401).send(err);
  }
};
export { getPost, newPost, specificPost, deletePost, updatePost, likePost };
