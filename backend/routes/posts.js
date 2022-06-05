const router = require("express").Router();
const {

  userAuth,

  checkRole
} = require("../controllers/Auth");
const {
  addPost,
  getAllPosts,
  userPosts,
  getPostById,
  isOwner,
  deletePost,
  likePost,
  unlikePost,
  deleteComment,
  addComment,
} = require("../controllers/postController");
const { getUserById } = require("../controllers/userController");



const upload = require('../middlewares/upload')

// router.post("/add" , upload.single('image_cover'),  creatFood);



router.get("/api/posts/:userId",userAuth, getAllPosts);
router.get("/api/posts/by/:userId",userAuth, userPosts);
router.delete("/api/post/:postId",userAuth,isOwner,  deletePost);
router.post("/api/post/create/:userId",userAuth, addPost);
router.put("/api/post/like",userAuth, likePost);
router.put("/api/post/unlike",userAuth, unlikePost);
router.put("/api/post/comment",userAuth, addComment);
router.put("/api/post/uncomment",userAuth, deleteComment);

router.param("userId", getUserById);
router.param("postId", getPostById);
module.exports = router;