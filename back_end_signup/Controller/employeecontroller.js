const { Model } = require('sequelize');
const db = require("../models");

const saveEmployee = async (req, res) => {
    try {
        const { name, age, password, location, salary, Dept } = req.body;

        // Basic validation for required fields
        if (!name || !age || !password || !location || !salary || !Dept) {
            return res.status(400).send({ message: "All fields are required." });
        }

        // Create a new employee record in the database
        const employee = await db.employee.create({
            name,
            age,
            password,
            location,
            salary,
            Dept
        });

        // Send success response with the saved employee details
        res.status(200).send({ message: "Saved successfully", employee });
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).send({ message: "Not saved", error: error.message });
    }
};


module.exports = {
    saveEmployee,
};
