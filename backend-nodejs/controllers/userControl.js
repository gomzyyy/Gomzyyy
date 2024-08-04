import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "Something is missing" });
        };
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        };
        if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return res.status(400).json({ message: "incorrect password" })
            }
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true, sameSite: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
            return res.status(200).json({ message: "login success." })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "an error occured while logging in." })
    }
};

export const logout = async (req, res) => {

    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({ message: "no token found" })
        }
        jwt.verify(token, process.env.SECRET_KEY, async (error, decode) => {
            if (error) {
                console.log(error)
                return res.status(401).json({ message: "invalid token" })
            }
            const userId = decode.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }
            return res.cookie("token", "", { httpOnly: true, sameSite:"strict", expires: new Date(0) }).status(200).json(
                {
                    message: "loggout successful.",
                    success: true
                });
        });
    } catch (error) {
        console.log("an error occured", error)
        res.status(500).json({ message: "logout unsuccessful due to some reasons." })
    }
}

export const removeUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

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
        if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return res.status(400).json({ message: "incorrect password" })
            }
            await User.deleteOne({ userName });

            return res.status(200).json({
                message: "User removed successfully.",
                success: true,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false,
        });
    }
};