const db = require('../models');

// Create a new student
const createStudent = async (req, res) => {
    try {
        const student = await db.sstudent.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const studentname = async (req, res) => {
    try {
        const { student_name } = req.params;
  console.log(student_name , "==================naame")
        // Check if the name is provided
        if (!student_name) {
            return res.status(400).json({ error: 'Student name is required' });
        }

        // Create a new student record
        const newStudent = await db.sstudent.create({ student_name });

        // Return the created student ID
        res.status(200).json({ student_id: newStudent.student_id });
    } catch (error) {
        console.error("Error saving student:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await db.sstudent.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
    try {
        const student = await db.sstudent.findByPk(req.params.id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student by ID
const updateStudent = async (req, res) => {
    try {
        const student = await db.sstudent.findByPk(req.params.id);
        if (student) {
            await student.update(req.body);
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        const student = await db.sstudent.findByPk(req.params.id);
        if (student) {
            await student.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    deleteStudent,
    updateStudent,
    getStudentById,
    getAllStudents ,
    createStudent,
    studentname
    

}