import Users from "../models/users.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export const addUser = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const { name, email  } = req.body;
    const newUser = new Users({
        name,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User Added successfully" });
    }catch (error) {
        res.status(500).json(error.message);
      }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Entered Email is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect. Authentication failed" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET_Key,
            { expiresIn: "1h" }
        );

        // Set the cookie and send a response
        res.cookie("authToken", token, { 
            httpOnly: true, 
            secure: false // Change to `true` in production with HTTPS
        });

        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

