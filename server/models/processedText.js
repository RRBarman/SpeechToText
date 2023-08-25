import mongoose, { model } from "mongoose";
const ProcessedText = new mongoose.Schema({
    user_id : {type: String },
    result: { type: String },   // required: true },
    description: { type: Object }   //, required: true }
},
    {
        timestamps: true,
    });
export default mongoose.model("ProcessedText", ProcessedText);