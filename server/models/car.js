const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    type: String,
    brand: String,
    model: String,
    color: String,
    year: Number,
    ownerId: String,
});

module.exports = mongoose.model('Cars', carSchema);