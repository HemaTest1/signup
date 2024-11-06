const db = require('../models');


const savesubject = async (req,res) => {
    try {
        const {subject_name} = req.body;
        console.log("subject_name ",subject_name)
        const subject = await db.subject.create({
            subject_name  : subject_name
        });
        
        res.status(200).send({message:"saved"})
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).send({message:error.message})
    }
};


 const getAllsubjects = async (req, res) => {
    try {
        const subjects = await db.subject.findAll(); // Fetch all records from the subjects table
       
        if(subjects === undefined){
            res.status(401).send("data not avaliable");
        }
        res.status(200).json(subjects); // Send the data as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message }); // Handle errors
    }
};


module.exports = {
    savesubject,
    getAllsubjects,

}