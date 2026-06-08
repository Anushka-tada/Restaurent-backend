const Contact = require("../models/Contact");

// Create a new contact message
const createContact = async(req, res) => {
    try{
        const {name , email , phone , subject , message} = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
        });
        res.status(201).json({
            message: "Contact message created successfully",
            contact,
        });

    }
    catch(err){
        console.error("Error in creating contact message", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const getContact = async(req, res) => {
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        res.status(200).json({
            message: "Contacts retrieved successfully",
            contacts,
        });
    }
    catch(err){
        console.error("Error in retrieving contact messages", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const getSingleContact = async(req, res) => {
    try{
        const {id} = req.params;
        const contact = await Contact.findById(id);

        if(!contact){
            return res.status(404).json({message: "Contact message not found"});
        }   
        res.status(200).json({
            message: "Contact message retrieved successfully",
            contact,
        });
    }   
    catch(err){
        console.error("Error in retrieving contact message", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteContact = async(req, res) => {
    try{
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);        

        if(!contact){
            return res.status(404).json({message: "Contact message not found"});
        }
        res.status(200).json({
            message: "Contact message deleted successfully",
        });
    }
    catch(err){
        console.error("Error in deleting contact message", err);
        res.status(500).json({message: "Internal server error"});
    }

}

module.exports = {
    createContact,
    getContact,
    getSingleContact,
    deleteContact,
}