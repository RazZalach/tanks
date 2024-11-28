const mongoose = require('mongoose');
const Tank = require('../model/tank');




module.exports = {


    createTank: async (req, res) => {
        try {
            const tankData = req.body;
            const newTank = new Tank({
                _id: new mongoose.Types.ObjectId(),
                ...tankData,
            });
            await newTank.save();
            res.status(201).json({ message: 'Tank created successfully', tank: newTank });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getTanks: async (req, res) => {
        try {
            const tanks = await Tank.find();
            res.status(200).json(tanks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getTanksByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const tanks = await Tank.find({ category });
            res.status(200).json(tanks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateTank: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedTank = await Tank.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedTank) {
                return res.status(404).json({ message: 'Tank not found' });
            }
            res.status(200).json({ message: 'Tank updated successfully', tank: updatedTank });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteTank: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTank = await Tank.findByIdAndDelete(id);
            if (!deletedTank) {
                return res.status(404).json({ message: 'Tank not found' });
            }
            res.status(200).json({ message: 'Tank deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    filterTanks: async (req, res) => {
        try {
            const { minWeight, maxWeight, minYear, maxYear } = req.query;
            const filters = {};

            if (minWeight) filters.weight = { $gte: parseFloat(minWeight) };
            if (maxWeight) filters.weight = { ...filters.weight, $lte: parseFloat(maxWeight) };
            if (minYear) filters.yearprod = { $gte: parseInt(minYear) };
            if (maxYear) filters.yearprod = { ...filters.yearprod, $lte: parseInt(maxYear) };

            const tanks = await Tank.find(filters);
            res.status(200).json(tanks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    addArmo: async (req, res) => {
        try {
            const { id } = req.params;
            const { armoItem } = req.body;
            const tank = await Tank.findById(id);
            if (!tank) {
                return res.status(404).json({ message: 'Tank not found' });
            }
            tank.armo.push(armoItem);
            await tank.save();
            res.status(200).json({ message: 'Armo added successfully', tank });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getTanksByCountry: async (req, res) => {
        try {
            const { country } = req.query;
            const tanks = await Tank.find({ country });
            res.status(200).json(tanks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getTanksByRoll: async (req, res) => {
        try {
            const { roll } = req.query;
            const tanks = await Tank.find({ roll });
            res.status(200).json(tanks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    Get5TopTanks: async (req, res) => {
        try {
            const tanks = await Tank.find().sort({ weight: -1 }).limit(5);
            res.status(200).json(tanks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },




};