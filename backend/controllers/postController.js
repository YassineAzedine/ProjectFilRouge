
const Post = require("../models/Post");
const User = require("../models/User");

const Profile = require("../models/Profile");

const getAllPosts = (req, res) => {
    let following = req.user.following;
    following.push(req.user._id);
    Post.find({ postedBy: { $in: req.user.following } })
        .populate("comments", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .sort("-createdAt")
        .exec((err, posts) => {
            if (err) res.json({ error: err });
            res.json(posts);
        });
};
const getAllPostsByAdmin = (req , res)=>{

    Post.find()
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name email")


    .exec((err, posts) => {
            if (err) res.json({ error: err.message });
            res.json(posts);
        });



}
const getAllPostsrecruteur = (req, res) => {
    


    // following.push(req.user._id);
    
    Post.find({postedBy: req.user })
   
        .exec((err, posts) => {

            if (err) res.json({ error: err });

            res.json(posts);

        });
};

const userPosts = (req, res) => {
              
    Post.find({ postedBy: req.profile._id })
    
        // .populate("comments", "text created")
        // .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        // .sort("-createdAt")
        .exec((err, posts) => {
            if (err) res.json({ error: err.message });
            res.json(posts);
        });
};

const getPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate("comments", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err) res.json({ error: err });
            req.post = post;
            next();
        });
};

const isOwner = (req, res, next) => {
console.log("🚀 ~ file: postController.js ~ line 47 ~ isOwner ~ req", req.auth)
    
    let isMine = req.post ;
    console.log("🚀 ~ file: postController.js ~ line 50 ~ isOwner ~ isMine", isMine)
    if (!isMine) {
        return res.json({ error: "Non authorisé" });
    }
    next();
};

const addPost = (req, res) => {
    console.log("🚀 ~ file: jobofferController.js ~ line 66 ~ addOffre ~ ddldldl", req.file)

    const { text } = req.body;
    let post = new Post({ text, postedBy: req.user._id });
    if (req.file) {
        post.image = req.file.originalname
      }
    post.save((err, data) => {
        if (err) res.json({ error: err });
        res.json(data);
    });
};

const addPostrecruteur = (req, res) => {
    console.log("🚀 ~ file: postController.js ~ line 58 ~ addPost ~ req", req.file)
    
    console.log("🚀 ~ file: postController.js ~ line 51 ~ addPost ~ req", req.body)
        const { text } = req.body;
        let post = new Post({ text, postedBy: req.user._id });
        if (req.file) {
            post.image = req.file.originalname
          }
        post.save((err, data) => {
            if (err) res.json({ error: err });
            res.json(data);
        });
    };

const deletePost = (req, res) => {
    let postToDelete = req.post;

        postToDelete.remove((err, deletedPost) => {
            if (err) res.json({ error: err.message });
            res.json({message : "post suprimer"});
        });
  
 
};

const likePost = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.body.userId } },
        { new: true }
    ).exec((err, result) => {
        if (err) res.json({ error: err });
        res.json(result);
    });
};

const unlikePost = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.body.userId } },
        { new: true }
    ).exec((err, result) => {
        if (err) res.json({ error: err });
        res.json(result);
    });
};

const addComment = (req, res) => {
console.log("🚀 ~ file: postController.js ~ line 100 ~ addComment ~ req", req.body)
    
    let comment = { text: req.body.text };
    comment.postedBy = req.body.userId;
    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment } },
        { new: true }
    ).exec((err, result) => {
        if (err) res.json({ error: err });
        res.json(result);
    });
};

const deleteComment = (req, res) => {
    let comment_id = req.body.comment_id;
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $pull: {
                comments: {
                    _id: comment_id,
                },
            },
        },
        { new: true }
    ).exec((err, result) => {
        if (err) res.json({ error: err });
        res.json(result);
    });
};
const addProfile = (req, res) => {
console.log("🚀 ~ file: postController.js ~ line 185 ~ addProfile ~ req", req.body)

    const { phone } = req.body;
    const { pdf } = req.body;


    const offreid = req.params.offreid
    let profile = new Profile({  phone, pdf, postedBy: req.user._id ,joboffre_id:offreid });
  
      profile.save((err, data) => {
        if (err) res.json({ error: err });
        res.json({
            message: "votre candidature a bien été reçue ",
            success: true
        });
    });
};
const getProfile = (req, res) => {
    Profile.find()
    .populate("postedBy", "_id name username email")
 
    .exec((err, profiles) => {
        if (err) res.json({ error: err });
        res.json(profiles);
    });
    };
    
module.exports = {
    getAllPosts,
    addPost,
    userPosts,
    getPostById,
    isOwner,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
    addPostrecruteur,
    addProfile,
    getAllPostsrecruteur,
    getAllPostsByAdmin,
    getProfile,
    
};

