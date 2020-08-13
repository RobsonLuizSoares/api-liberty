const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");


class UsuarioController {

    // GET /
    async index(req, res, next) {
        const user = await Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    // GET /:id
    async show(req, res, next) {
        const user = await Usuario.findById(req.params.id)
            .populate({ path: "loja" })
            .then(usuario => {
                if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
                return res.json({
                    usuario: {
                        nome: usuario.nome,
                        email: usuario.email,
                        permissao: usuario.permissao,
                        loja: usuario.loja
                    }
                });
            }).catch(next);
    }

    // POST /registrar
    async store(req, res, next) {
        const { nome, email, password, loja } = req.body;

        const usuario = new Usuario({ nome, email, loja });
        usuario.setSenha(password);

        await usuario.save()
            .then(() => res.json({ usuario: usuario.enviarAuthJSON() }))
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }

    // PUT /
    async update(req, res, next) {
        const { nome, email, password } = req.body;
        const userUpdated = await Usuario.findById(req.payload.id).then((usuario) => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if (typeof nome !== "undefined") usuario.nome = nome;
            if (typeof email !== "undefined") usuario.email = email;
            if (typeof password !== "undefined") usuario.setSenha(password);

            return usuario.save().then(() => {
                return res.json({ usuario: usuario.enviarAuthJSON() });
            }).catch(next);
        }).catch(next);
    }

    // DELETE /
    async remove(req, res, next) {
        const userRemoved = Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return usuario.remove().then(() => {
                return res.json({ deletado: true });
            }).catch(next);
        }).catch(next);
    }

    // POST /login
    async login(req, res, next) {
        const { email, password } = req.body;

        const user = await Usuario.findOne({ email }).then((usuario) => {
            if (!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if (!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }


}

module.exports = UsuarioController;