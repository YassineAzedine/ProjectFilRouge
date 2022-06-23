
const Post = require("../models/Post");
const Offre = require("../models/JobOffer");


const User = require("../models/User");


const getAllOffre = (req, res) => {
    Offre.find()
    .populate("postedBy", "_id name image")
   
    .exec((err, offres) => {

        if (err) res.json({ error: err });

        res.json(offres);

    });
};
const getOffres = (req, res) => {
    


    // following.push(req.user._id);
    
    Offre.find({postedBy: req.user })
   
        .exec((err, offres) => {

            if (err) res.json({ error: err });

            res.json(offres);

        });
};
const getOneOffre = (req, res) => {
    

const id = req.params.offreId
    // following.push(req.user._id);
    
    Offre.findOne({_id: id })
   
        .exec((err, offre) => {

            if (err) res.json({ error: err });

            res.json(offre);

        });
};

const recruteurOffres = (req, res) => {
              
    Offre.find({ postedBy: req.user._id })
    
        // .populate("comments", "text created")
        // .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        // .sort("-createdAt")
        .exec((err, offres) => {
            if (err) res.json({ error: err.message });
            res.json(offres);
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
    
    let isMine = req.post ;
    console.log("🚀 ~ file: postController.js ~ line 50 ~ isOwner ~ isMine", isMine)
    if (!isMine) {
        return res.json({ error: "Non authorisé" });
    }
    next();
};

const addOffre = (req, res) => {
console.log("🚀 ~ file: jobofferController.js ~ line 66 ~ addOffre ~ req", req.jwt)

    const { CompanyName } = req.body;
    const { JobTitle } = req.body;
    const { email } = req.body;
    const { description } = req.body;
    const  postedBy  = req.user._id;
    


    let Offres = new Offre({
        CompanyName,
        JobTitle,
        email,
        description,
        postedBy,
       

      });
 
      Offres.save((err, data) => {
        if (err) res.json({ error: err });
        res.json(data);
    });
};
const updateoffre = async (req, res) => {   
console.log("🚀 ~ file: jobofferController.js ~ line 116 ~ updateoffre ~ req", req.body)

  
        
    const { CompanyName } = req.body;
    const { JobTitle } = req.body;
    const { email } = req.body;
    const { description } = req.body;
    const { postedBy } = req.body;
    const offreid = req.params.offreId


      const updateone = await Offre.updateOne({_id : offreid},{

        $set:{
            CompanyName,
            JobTitle,
            email,
            description,
            postedBy
           

        }
      })
 
      res.status(201).json({ success: true, data: updateone })
    };

const deleteoffre = async (req, res) => {
    const offreid = req.params.offreId
    try {
      await Offre.remove({ _id: offreid })
  
      res.status(200).json({ success: true, data: deleteoffre })
    } catch (error) {
      res.status(409).json({ success: false, data: [], error: error })
    }
  
 
};

module.exports = {
    getOffres,
    addOffre,
    updateoffre,
    deleteoffre,
    recruteurOffres,
    getOneOffre,
  
    getAllOffre
};

