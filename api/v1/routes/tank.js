const express = require('express');
const router = express.Router();

const {createTank,getTanks,getTanksByCategory,updateTank,deleteTank,filterTanks,addArmo,getTanksByCountry,getTanksByRoll,Get5TopTanks,} = require('../controller/tanks');



// Define routes
router.post('/create', createTank); // Create a new tank
router.get('/', getTanks); // Get all tanks
router.get('/category/:category', getTanksByCategory); // Get tanks by category
router.put('/update/:id', updateTank); // Update a tank by ID
router.delete('/delete/:id', deleteTank); // Delete a tank by ID
router.get('/filter', filterTanks); // Filter tanks by weight and year
router.post('/addArmo/:id', addArmo); // Add armo to a tank
router.get('/country', getTanksByCountry); // Get tanks by country
router.get('/roll', getTanksByRoll); // Get tanks by roll
router.get('/top5', Get5TopTanks); // Get top 5 tanks by weight



module.exports = router;


