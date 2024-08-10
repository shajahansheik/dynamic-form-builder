const express = require('express');
const router = express.Router()
const Model = require('../models/model');
const { v4: uuidv4 } = require('uuid');

router.post('/create', async (req, res) => {
    const data = new Model({
        formId: uuidv4(),
        ...req.body,
    })

    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await Model.findOne({formId: req.params.id});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const data = await Model.findOneAndDelete({formId: req.params.id});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;