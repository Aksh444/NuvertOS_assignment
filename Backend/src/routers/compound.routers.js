const express = require('express');
const { getAllCompounds, getCompoundById, updateCompound } = require('../controllers/compound.controllers.js');
const { updateRules } = require('../validators/compound.validate.js'); 
const validate = require('../middlewares/validate.js');
const verifyJWT = require('../middlewares/auth.js');

const router = express.Router();

router.get('/all', getAllCompounds);
router.get('/:id', getCompoundById);
router.put('/:id', verifyJWT, updateRules, validate, updateCompound);

module.exports = router;
