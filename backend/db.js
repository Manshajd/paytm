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
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type:String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type:String,
        required: true
    }
},
{ 
    timestamps:true 
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});


const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

// export default User;
module.exports = { 
    User,
    Account 
};