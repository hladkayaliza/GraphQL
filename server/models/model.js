const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    model: String,
    brand: String,
});

module.exports = mongoose.model('Model', modelSchema);
