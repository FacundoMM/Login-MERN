
const {model, User, Owner } = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.json({ msg: "User registered successfully!", user });
            })
            .catch(err => res.status(400).json(err));
    },
    assignOwnerRole: (req, res) => {
        const owner = new Owner(req.body);
        owner.save()
            .then(() => {
                res.json({ msg: "Owner role assigned successfully!", owner });
            })
            .catch(err => res.status(400).json(err));
    },
    logout: (req, res) => {
        // clear the cookie from the response
        res.clearCookie("usertoken");
        res.status(200).json({
            message: "You have successfully logged out of our system",
        });
    },
    login: (req, res) => {
        model.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    
                    return res.status(400).json({ error: `Invalid email or password ${user}` });
                }

                if (req.body.password === undefined) {
                    return res.status(400).json({ error: "Invalid email or password" });
                }

                bcrypt.compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if (!passwordIsValid) {
                            return res.status(401).json({ error: "Invalid email or password" });
                        }

                        const userInfo = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            __t: user.__t,
                        };

                        const secret = "mysecret";
                        const newJWT = jwt.sign(userInfo, secret);

                        res.status(200)
                            .cookie("usertoken", newJWT, {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000),
                            })
                            .json({ msg: "Login successful!", user: userInfo, newJWT });
                    })
                    .catch(err => res.status(500).json({ error: "Internal server error" }));
            })
            .catch(err => res.status(500).json({ error: "Internal server error" }));
    }
}
