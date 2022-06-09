const router = require("express").Router();
const {
    userRegister,
    userLogin,
    userAuth,
    serializeUser,
    checkRole
  } = require("../controllers/Auth");



  const {
    createUser,
    getUserById,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserPhoto,
    addFollower,
    addFollowing,
    removeFollowing,
    removeFollower,
  } = require("../controllers/userController");

  //user
  router.post("/api/users/create", createUser);
router.get("/api/user/:userId", getUser);
router.get("/api/users",  getAllUsers);
router.get("/api/user/photo/:userId", getUserPhoto);
router.put("/api/users/:userId",userAuth ,  updateUser);
router.delete(
    "/api/users/:userId",
 
    deleteUser
  );
  router
  .route("/api/user/add/follow")
  .put( addFollowing, addFollower);
  router
  .route("/api/user/remove/follow")
  .put( removeFollowing, removeFollower);
  router.param("userId", getUserById);



  //
//Users Registration Route
router.post('/register-user', async(req,res)=>{
    await userRegister(req.body, "user", res);
});
//Owner User Registration Route
router.post('/register-recruteur', async(req,res)=>{
    await userRegister(req.body, "recruteur", res);
});

//Admin Registration Route
router.post('/register-admin', async(req,res)=>{
    await userRegister(req.body, "admin", res);
});







// User Login Route


router.post('/login-user', async(req,res)=>{
    await userLogin(req.body,"user",res);
});
//Owner User Login Route

router.post('/login-recruteur', async(req,res)=>{
    await userLogin(req.body,"owner-user",res);

});

//Admin Login Route

router.post('/login-admin', async(req,res)=>{
    await userLogin(req.body,"admin",res);

});


//Profile Route 
router.get("/profile", userAuth, async (req,res)=>{
      console.log(req.user);
    return res.json(serializeUser(req.user));
});
//Users Protected Route 

router.get('/user-protectd',userAuth,checkRole(['user']) ,async(req,res)=>{
    return res.json("hello User")
});

//Owner User Protected Route
router.get('/recruteur-protectd',userAuth,checkRole(['recruteur']) ,async(req,res)=>{
    return res.json("hello recruteur")

});


//Admin Protected Route

router.get('/admin-protectd',userAuth,checkRole(['admin']) ,async(req,res)=>{
    return res.json("hello admin")

});

module.exports = router;







module.exports = router;
