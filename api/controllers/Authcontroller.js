import jwt from 'jsonwebtoken';
import { handleError } from "../helpers/handleError.js";
import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs';

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return next(handleError(409, "User already registered"));
        }

        // Hash the password
        const hashPassword = bcryptjs.hashSync(password, 10); // ✅ Fixed missing salt rounds

        // Create new user
        const user = new User({ name, email, password: hashPassword });
        await user.save();

        res.status(201).json({ success: true, message: "Registered successfully" });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return next(handleError(404, "User not found."));
        }

        // Compare password
        const comparePassword = await bcryptjs.compare(password, user.password);
        if (!comparePassword) {
            return next(handleError(401, "Incorrect password."));
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // ✅ Added token expiration
        );

        // Set the token as an HTTP-only cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        res.status(200).json({
            success: true,
            user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
            token,
            message: "Login successful"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            const password = Math.round(Math.random() * 1000000).toString();
            const hashPassword = bcryptjs.hashSync(password, 10);

            user = new User({ name, email, password: hashPassword, avatar });
            await user.save();
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        res.status(200).json({ 
            success: true, 
            user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
            token,
            message: "Login successful"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


export const Logout = async (req, res, next) => {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined, // Add this if needed
      });
  
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(handleError(500, `Logout failed: ${error.message}`));
    }
  };
  

