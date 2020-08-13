
const Joi = require('@hapi/joi')

const usuarioValidation = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})

module.exports = {
    usuarioValidation
}






/* const BaseJoi = require('@hapi/joi')
const Extension = require('@hapi/joi-date')

const Joi = BaseJoi.extend(Extension)

const UsuarioValidation = {
    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        body: {
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    update: {
        body: {
            nome: Joi.string().required().optional(),
            email: Joi.string().email().required().optional(),
            password: Joi.string().required().optional()
        }
    },
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
}

module.exports = {
    UsuarioValidation
} */