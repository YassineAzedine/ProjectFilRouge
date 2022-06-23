
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProfileSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            trim: true,
            required: true,
        },
        pdf: {
            type: String,
            required: true
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
         joboffre_id : {
            type: ObjectId,
            ref: "JobOffer",
         }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Profile", ProfileSchema);
