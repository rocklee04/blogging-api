const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const dotenv = require('dotenv');

dotenv.config();

async function signup(req, res) {

    try{
        const {username, avatar, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 8);

        const user = new User({username, avatar, email, password: hashed});
        await user.save();

        res.status(201).json({message: 'User successfully registered'});
    } catch(err) {
        res.status(500).json({message: 'An error occurred'});
    }
} 


async function login(req, res) {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const matched = await bcrypt.compare(password, user.password);

        if(!matched) {
            res.status(401).json({message: 'Invalid Credentials'});
        }

        const token = jwt.sign({id: user._id}, process.env.jwtSecret, {expiresIn: '3hr'});
        res.status(201).json({message: 'User Login registered', token});
    } catch(err) {
        res.status(500).json({message: 'An error occurred'});
    }    
}


module.exports = {
    signup, 
    login,
}