import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            })
        };
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "password doesn't matched",
                success: false
            })
        };
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({
                message: "user exists, try a different username.",
                success: false
            })
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            gender
        });
        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error, please try again later.",
            success: false
        });
    };
};
export const removeUser = async (req, res) => {
    try {
        const { userName } = req.body;

        if (!userName) {
            return res.status(400).json({
                message: "Username is required.",
                success: false,
            });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        await User.deleteOne({ userName });

        return res.status(200).json({
            message: "User removed successfully.",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false,
        });
    }
};