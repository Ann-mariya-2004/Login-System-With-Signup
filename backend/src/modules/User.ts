import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    address: String,
    phone:String,
    password: String,
},{timestamps: true});

export default mongoose.model("User",userSchema);