const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const LojaSchema = mongoose.Schema({
    nome: { type: String, required: true }

}, { timestamp: true })

LojaSchema.plugin(uniqueValidator, { message: 'Já está sendo utilizado' })

module.exports = mongoose.model('Loja', LojaSchema)