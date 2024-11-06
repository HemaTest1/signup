const { Model } = require('sequelize');
const db = require('../models')

 const insertcourse = async (req ,res) => {

    try {
         const {coursename,duration} = req.body;
         const course = await db.course.create({
            coursename : coursename,
            duration : duration,
        });
        res.status(200).send({message:"saved"})
    } catch (error) {
        console.error('Error inserting a data' , error)
        res.status(500).send({message:"error" , error})
        
    }

}   
    const getAllCourses = async (req, res) => {
        try {
            const courses = await db.course.findAll(); // Retrieve all courses
            res.status(200).json(courses); // Return the courses as JSON
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).send({ message: 'Server error', error });
        }
    };

    // Delete Subject Function
const deletecourse = async (req, res) => {
    try {
        const { course_id } = req.params; // Assuming subject_id is passed as a URL parameter

        // Check if the subject exists
        const course = await db.course.findByPk(course_id);
        if (!course) {
            return res.status(404).send({ message: "course not found" });
        }

        // Delete the subject
        await db.course.destroy({
            where: { course_id: subject_id }
        });

        res.status(200).send({ message: "course deleted successfully" });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send({ message: error.message });
    }
};

const getcoursenamebyid = async (req, res) => {
    try {
        const courseId = req.params.course_id;
        const course = await db.course.findOne({
            where: { course_id: courseId },
            attributes: ['coursename']
        });

        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'course not found' });
        }
    } catch (error) {
        console.error('Error fetching course name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
    
   
module.exports = {
        insertcourse,
        getAllCourses,
        getcoursenamebyid,
        deletecourse,
}