import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

//REGISTRATION
export const register = async (req, res)=>{
    try {
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt); //encrypt the pass using the salt

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

//LOGIN

export const login = async (req, res)=>{

    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User is not registered!"});
        };

        const isPassTrue = await bcrypt.compare(password, user.password);
        if(!isPassTrue){
            return res.status(401).json({message: "Invalid Credentials!"});
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password; //avoiding password sending to front end
        res.status(200).json({token, user})

    }catch(error){
        res.status(500).json({error: error.message});
    }
}