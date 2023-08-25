import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
import User from "../models/User.js";
const login = async (req, res, next) => {
    try {
        /*data) => req.body.email === data.email*/
        let foundUser = await User.findOne({
            email: req.body.email,
        }).exec();
        console.log(foundUser);
        if (foundUser) {
            let submittedPass = req.body.password;
            let storedPass = foundUser.password;
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
                let id = foundUser._id;
                const token = jwt.sign({ user: { usrname, id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ // 200 OK
                    token: token,
                })
            } else {
                res.status(401).json({ // 401 Unauthorized
                    error: "Invalid email or password"
                });
            }
        }
        else {
            res.status(401).json({ // 401 Unauthorized
                error: "no such email esists"
            });
        }
    } catch {
        res.status(500).json({ // 500 Internal Server Error
            error: "Invalid email or password"
        });
    }

};
export default login;