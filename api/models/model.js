const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    formId: String,
    title: String,
    description: String,
    questions: Array,
})

module.exports = mongoose.model('forms', dataSchema);