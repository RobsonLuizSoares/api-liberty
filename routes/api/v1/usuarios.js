const router = require('express').Router()

const auth = require('../../auth')
const UsuarioController = require('../../../controllers/UsuarioController')
/* const Validation = require('express-validation') */


const usuarioController = new UsuarioController()

router.get('/', auth.required, usuarioController.index)
router.get('/:id', auth.required,/*  Validation(UsuarioValidation.show), */ usuarioController.show)

router.post('/login',/*  Validation(UsuarioValidation.login), */ usuarioController.login)
router.post('/registrar',/*  Validation(UsuarioValidation.store), */ usuarioController.store)
router.put('/', auth.required, /* Validation(UsuarioValidation.update), */ usuarioController.update)
router.delete('/', auth.required, usuarioController.remove)

module.exports = router