const db = require('../models');

// Create a new result
const createResult = async (req, res) => {
    try {
        const result = await db.results.create(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all results
const getAllResults = async (req, res) => {
    try {
        const results = await db.results.findAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single result by ID
const getResultById = async (req, res) => {
    try {
        const result = await db.results.findByPk(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a result by ID
  const updateResult = async (req, res) => {
    try {
        const result = await db.results.findByPk(req.params.id);
        if (result) {
            await result.update(req.body);
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a result by ID
const deleteResult = async (req, res) => {
    try {
        const result = await db.results.findByPk(req.params.id);
        if (result) {
            await result.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const createOrUpdateResult = async (req, res) => {
//     const { student_id, marks } = req.body;

//     try {
//         // Create a new result for this student_id
//         const result = await Results.create({ student_id, marks });
//         res.status(201).json({ message: 'Result created successfully', result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



const createOrUpdateResult = async (req, res) => {
    const { studentId, score } = req.body;

    try {
        // Assuming you have a Results model to save the score
        const newResult = await db.results.create({
            student_id: studentId,
            marks: score,
            // Add any other fields as necessary
        });

        res.status(200).json(newResult); // Respond with the created result
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ error: 'Failed to save result' });
    }
};
module.exports = {
    deleteResult,
    updateResult,
    getResultById,
    getAllResults,
    createResult,
    createOrUpdateResult,
}
