const mongoose = require('mongoose')

const LojaSchema = mongoose.Schema({
    nome: { type: String, required: true }

}, { timestamp: true })


module.exports = mongoose.model('Loja', LojaSchema)