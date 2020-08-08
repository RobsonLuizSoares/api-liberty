const mongoose = require('mongoose')

const Loja = mongoose.model('Loja')

class LojaController {

    //GET /
    async index(req, res, next) {
        await Loja.find({})
            .select('nome')
            .then(lojas => res.send({ lojas }))
            .catch(next)
    }
    // GET /:id
    async show(req, res, next) {
        await Loja.findById(req.params.id)
            .select('nome')
            .then(loja => res.send({ loja }))
            .catch(next)
    }

    //POST /
    async store(req, res, next) {
        const { nome } = req.body

        const error = []
        if (!nome) error.push('nome')
        if (error.length > 0) return res.status(422).json({ error: 'required', payload: error })

        const loja = new Loja({ nome })
        loja.save().then(() => res.send({ loja })).catch(next)
    }

    //PUT /:id
    async update(req, res, next) {
        const { nome } = req.body

        await Loja.findById(req.params.id).then(loja => {
            if (!loja) return res.status(422).send({ error: 'Loja não existe' })

            if (nome) loja.nome = nome

            loja.save().then(() => res.send({ loja })).catch(next)
        }).catch(next)
    }

    //DELETE /:id
    async remove(req, res, next) {
        await Loja.findById(req.params.id).then(loja => {
            if (!loja) return res.status(422).send({ error: 'Loja não existe' })
            loja.remove().then(() => res.send({ deleted: true })).catch(next)
        }).catch(next)
    }

}

module.exports = LojaController