require("dotenv").config();

const mongoose = require("mongoose");
const { Schema, string } = require("zod");

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
}

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema({
    id: String,
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
},
{ 
    timestamps:true 
});

const User = mongoose.model('User', userSchema);

// export default User;
module.exports = { User };