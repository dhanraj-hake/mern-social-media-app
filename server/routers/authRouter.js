const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const router = express.Router();


// // Login user

router.post("/login", async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (user) {

            const verifyPassword = await bcrypt.compare(password, user.password);
            if (verifyPassword) {

                const { password, ...userInfo } = user._doc;

                // return res.status(200).json(userInfo);

                const auth_token = jwt.sign({ user: user.username, id: user._id }, process.env.JWT_KEY);

                res.status(200).json({
                    token: auth_token,
                    user: user,
                    success: true
                });

            }
            else {
                return res.status(404).json({ "detail": "Incorrect credentials" });
            }
        }
        else {
            return res.status(404).json({ "detail": "user not exist" });
        }

    }
    catch (error) {
        res.status(500).json({ "detail": "Internal Server Error" });
    }

});








// // Signup (create) user 

router.post("/signup", async (req, res) => {


    try {
        let { username, password, firstname, lastname } = req.body;

        if (!username) {
            return res.status(400).json({ "detail": "username is required" });
        }
        if (!password) {
            return res.status(400).json({ "detail": "password is required" });
        }

        if (!firstname) {
            return res.status(400).json({ "detail": "firstname is required" });
        }
        if (!lastname) {
            return res.status(400).json({ "detail": "firstname is required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ "detail": "password must be at least 6 characters" });
        }

        const userExist = await User.findOne({ username: username });

        if (!userExist) {

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);

            let user = new User({
                username: username,
                password: hashPassword,
                firstname: firstname,
                lastname: lastname,
            });

            user = await user.save();

            const auth_token = jwt.sign({ user: user.username, id: user._id }, process.env.JWT_KEY);

            res.status(200).json({
                token: auth_token,
                user: user,
                success: true
            });

            // return res.status(200).json({
            //     _id: user._id,
            //     username: user.username,
            //     firstname: user.firstname,
            //     lastname: user.lastname,
            // });
        }
        else {
            return res.status(404).json({ "detail": "username exist" });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "detail": "Internal Server Error" });
    }
});


module.exports = router;