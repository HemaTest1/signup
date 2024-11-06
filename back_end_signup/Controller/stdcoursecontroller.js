const { Model, where } = require('sequelize');
const db = require('../models')



  const insertstdcourse = async (req,res) => {

    try {
        const { studentId, courseId } = req.body;

        // Step 1: Check if the student exists in the database
        const student = await db.student.findByPk(studentId); // Use findByPk to fetch by primary key
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }

        // Step 2: Check if the course exists in the database
        const course = await db.course.findOne(
            {where : {id : courseId}}
        );

        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        // Step 3: Insert into the join table (StudentCourses)
        await student.addCourse(course);  // This will automatically insert into the join table 'StudentCourses'

        res.status(200).send({ message: "saved successfully" });
    } catch (error) {
        console.error("not saved", error);
        res.status(500).send({ message: error.message });
    }
};
const getStudentsByCourse = async (req, res) => {
    const { id: courseId } = req.params; // Get courseId from route parameters

    try {
        // Find the course along with the students
        const course = await db.course.findOne({
            where: { id: courseId },   // Find the course by ID (ensure 'id' is the correct column)
            include: [
                {
                    model: db.student, // Include the students associated with the course
                    as: 'students',    // Alias for the relation
                    attributes: ['id', 'name', 'email', 'age', 'phone'] // Select student fields
                }
            ]
        });

        console.log(courseId, "---------------------------courseId");
        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching students for course:', error);
        res.status(500).send({ message: 'Server error' });
    }
};


const getCourseByStudent = async (req, res) => {
    const { id: studentId } = req.params; // Get courseId from route parameters

    try { 
        const student = await db.student.findOne({
            where: { id: studentId },   // Find the course by ID (ensure 'id' is the correct column)
            include: [
                {
                    model: db.course, // Include the students associated with the course
                    as: 'courses',    // Alias for the relation
                    attributes: ['id', 'coursename', 'duration'] // Select student fields
                }
            ]
        });

        console.log(studentId, "---------------------------studentId");
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching course for student:', error);
        res.status(500).send({ message: 'Server error' });
    }
};

  module.exports = {
    insertstdcourse,
    getStudentsByCourse,
    getCourseByStudent,
  }