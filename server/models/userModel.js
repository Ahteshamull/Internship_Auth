import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {

        type: Date,
        default: Date.now
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        
    },
    resetPasswordExpiresAt: {
        type: Date,
        default: Date.now
    },
    verificationToken: {
        type: String,
      
    },
    verificationTokenExpiresAt: {
        type: Date,
        default: Date.now
    }
    
}, { timestamps: true });

export const User = mongoose.model("AuthUser", userSchema); 