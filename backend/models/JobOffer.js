
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const JobOfferSchema = new mongoose.Schema(
    {
        
        CompanyName: {
            type: String,
            trim: true,
            required: true,
        },
   
        description: {
            type: String,
            trim: true,
            required: true,
        },
     
        JobTitle: {
            type: String,
            required: true,
        },
      
        email: {
            type: String,
            required: true
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        
        


      
     
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("JobOffer", JobOfferSchema);

