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

// Delete Subject Function
const deleteSubject = async (req, res) => {
    try {
        const { subject_id } = req.params; // Assuming subject_id is passed as a URL parameter

        // Check if the subject exists
        const subject = await db.subject.findByPk(subject_id);
        if (!subject) {
            return res.status(404).send({ message: "Subject not found" });
        }

        // Delete the subject
        await db.subject.destroy({
            where: { subject_id: subject_id }
        });

        res.status(200).send({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).send({ message: error.message });
    }
};

const getsubjectnamebyid = async (req, res) => {
    try {
        const subjectId = req.params.subject_id;
        const subject = await db.subject.findOne({
            where: { subject_id: subjectId },
            attributes: ['subject_name']
        });

        if (subject) {
            res.status(200).json(subject);
        } else {
            res.status(404).json({ message: 'Subject not found' });
        }
    } catch (error) {
        console.error('Error fetching subject name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    savesubject,
    getAllsubjects,
    deleteSubject,
    getsubjectnamebyid,
}