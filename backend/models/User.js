const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema (
    {
        name : {
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"user",
            enum:["user","recruteur", "admin"]
        },
        username:{
            type:String,
            required:true
        },
        image: {
            data: Buffer,
            contentType: String,
          },
        password:{
            type:String,
            required:true
        },
        following: [{ type: ObjectId, ref: "User" }],
        followers: [{ type: ObjectId, ref: "User" }],
       

    },
    {timestamps:true}
);
module.exports = mongoose.model("User",UserSchema);