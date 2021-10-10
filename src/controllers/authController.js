const { pool } = require("../database/config");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const registro = async(req, res) => {
    try {
        pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], async(err, rows) => {
            if (rows.length > 0) {
                res.json({ text: "Usuario ya registrado" });
            } else {
                const email = req.body.email;
                const token = await generateJWT(email);
                const salt = bcrypt.genSaltSync();
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                pool.query("INSERT INTO users set ?", [req.body]);
                res.json({
                    ok: true,
                    text: 'Registro correcto',
                    email: email,
                    token,
                    data: req.body
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            Text: 'Algo salió mal',
        });
    }
};

const login = async(req, res) => {
    try {
        const email = req.body.email;
        const token = await generateJWT(email);
        pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], async(err, rows) => {
            if (rows.length > 0) {
                bcrypt.compare(
                    req.body.password,
                    rows[0].password,
                    function(err, ress) {
                        if (err) {
                            res.json({ ok: false, text: '' + err });
                        }
                        if (ress) {
                            res.json({
                                ok: true,
                                text: 'Login correcto',
                                email: email,
                                token,
                                data: rows[0]
                            });
                        } else {
                            res.json({
                                ok: false,
                                text: 'Correo o contraseña incorrecta'
                            });
                        }
                    });
            } else {
                res.json({
                    ok: false,
                    text: 'Correo o contraseña incorrecta'
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            text: 'Algo salio mal'
        });
    }
}

const renuevaToken = async(req, res) => {
    const email = req.body.email;
    const token = await generateJWT(email);
    return res.json({
        ok: true,
        text: 'Validando token / Renovar token',
        email: email,
        token,
    });
};

//agregar colicitd
const addSolicitud = async(req, res) => {
    try {
        pool.query("INSERT INTO solicitud set ?", [req.body]);
        res.json({
            ok: true,
            text: 'Registro correcto',
            data: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            Text: 'Algo salió mal',
        });
    }
};

module.exports = {
    renuevaToken,
    registro,
    login,
    addSolicitud
};