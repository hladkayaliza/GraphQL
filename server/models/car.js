const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    type: String,
    modelId: String,
    color: String,
    year: Number,
    ownerId: String,
});

module.exports = mongoose.model('Cars', carSchema);