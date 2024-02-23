const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            return res.status(409).json({message: "User already exist"});
        }
        const userInfo = new User(req.body);
        userInfo.password = await bcrypt.hash(password, 10);
        await userInfo.save();
        return res.status(201).json({message: 'success', response: userInfo});
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: "Auth failed username/password incorrect" });
        }

        //check pass
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(403)
                .json({ message: "Auth failed username/password incorrect" });
        }
        const userObject = {
            email,
            name: user.name,
            _id: user._id
        }
        const jwtToken = jwt.sign(userObject,
            process.env.JWT_SECRET, { expiresIn: '4h' });

        userObject.jwtToken = jwtToken;
        res.status(200)
            .json({ message: "success", data: userObject });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

module.exports = {
    registerUser,
    loginUser
}
