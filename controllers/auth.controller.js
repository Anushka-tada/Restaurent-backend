const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req , res) => {

  try{
      const {name , email , password , role} = req.body;

    const isUserAlreadyExist = await UserModel.findOne({email});

    if(isUserAlreadyExist){
       return res.status(400).json({message: "User already exists"});
    }


    const hash = await bcrypt.hash(password , 10);

    const User = await UserModel.create({
        name , email , role , password: hash
    })

    const token = jwt.sign({
        id: User._id,
        role: User.role,
    }, process.env.JWT_SECRET )


    res.cookie("token" , token );

      res.status(201).json({
        message: "User registered successfully",
        user: {
            id: User._id,
            username: User.name,
            email: User.email,
            role: User.role,
        }
    })
  }
  catch(err){
    console.error("Error in user registration", err);
    res.status(500).json({message: "Internal server error"});
  }


}

const loginUser = async (req, res) => {
    try{
       const { email , password} = req.body;
        
       const User = await UserModel.findOne({email});

       if(!User){
        return res.status(400).json({message: "Invalid email or password"});
       }

       const isPasswordValid = await bcrypt.compare(password , User.password);

       if(!isPasswordValid){
        return res.status(400).json({message: "Invalid email or password"});
       }

       const token = jwt.sign({
        id: User._id,
        role: User.role,
       }, process.env.JWT_SECRET)

       res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // prod me true, local me false
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
});

         res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: User._id,
                username: User.name,
                email: User.email,
                role: User.role,
            }
        })
    }
    catch(err){
        console.log("error in user login", err)
    }

}

async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully" })
}

const getAllUsers = async (req , res) => {
    try{
        const users = await UserModel.find({role: "user"}).select("-password");
         res.status(200).json({
      message: "Users fetched successfully",
      users,
    });

    }
    catch(err){
        console.error("Error in fetching users", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const getSingleUser = async (req , res) => {
    const id = req.params.id;

    try{
        const user = await UserModel.findById(id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    }
    catch(err){
        console.error("Error in fetching user", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteUser = async (req , res) => {
    const id = req.params.id;

    try{
        const user = await UserModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }   
        res.status(200).json({
            message: "User deleted successfully",
        });
    }   
    catch(err){
        console.error("Error in deleting user", err);
        res.status(500).json({message: "Internal server error"});
    }   
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getSingleUser,
    deleteUser
}