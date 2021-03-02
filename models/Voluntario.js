const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoluntarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    idade: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    disponibilidade: {
        type: Boolean,
        required: true,
    }

});

module.exports = mongoose.model('Voluntario', VoluntarioSchema);