import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({
                success: false, 
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const verifyCode = generateVerificationCode();
        
        const user = await User.create({
          name,
          email,
          password: hashPass,
        });
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message || "Internal server error"
        })
    }
};

export const registration = async (req, res) => {
    res.send("registration");
};
export const logout = async (req, res) => {
    res.send("logout");
};
