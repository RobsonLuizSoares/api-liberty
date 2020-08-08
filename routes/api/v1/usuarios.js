const router = require('express').Router()

const auth = require('../../auth')
const UsuarioController = require('../../../controllers/usuarioController')

const usuarioController = new UsuarioController()

router.get('/', auth.required, usuarioController.index)
router.get('/:id', auth.required, usuarioController.show)

router.post('/login', usuarioController.login)
router.post('/registrar', usuarioController.store)
router.put('/', auth.required, usuarioController.update)
router.delete('/', auth.required, usuarioController.remove)

module.exports = router