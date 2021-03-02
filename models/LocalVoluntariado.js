const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalVoluntariadoSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contacto: {
        type: String,
        required: true,
    },
    localizacao: {
        type: String,
        required: true,
    },
    morada: {
        type: String,
        required: true,
    },
    disponibilidade: {
        type: Boolean,
        required: true,
    },
    tarefa: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('LocalVoluntariado', LocalVoluntariadoSchema);