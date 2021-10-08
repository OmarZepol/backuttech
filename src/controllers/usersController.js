const { pool } = require("../database/config");
const bcrypt = require("bcryptjs");

//Obtener todos los pusuario
const getAll = async(req, res) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
            res.json({
                ok: true,
                text: 'Todos los usuarios',
                data: rows
            });
        });
    });
}

//Obtener solo uno
const getOne = async(req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE id = ?', [id],
            (err, rows) => {
                if (err) reject(err.message);
                if (rows.length > 0) {
                    res.json({
                        ok: true,
                        text: '',
                        data: rows[0]
                    });
                } else {
                    res.json({ text: 'Usuario no encontrado' });
                }
            });
    });
}

//Borrar un usuario
const eliminar = async(req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM users WHERE id = ?', [id],
            (err, rows) => {
                if (err) reject(err.message);
                res.json({
                    ok: true,
                    text: 'Usuario eliminado'
                });
            });
    });
}

//Actualizar un usuario
const update = async(req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        pool.query('UPDATE users set ? WHERE id = ?', [req.body, id],
            (err, rows) => {
                if (err) reject(err.message);
                res.json({
                    ok: true,
                    text: 'Usuario actualizado'
                });
            });
    });
}

/* 
//Activar un usuario
const activar = async (req, res) => {
    const { id } =  req.params;
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users set activo = 1 WHERE id = ?',[id],
            (err, rows) => {
                if (err) reject(err.message);
                res.json({
                    ok: true,
                    text:'El usuario ha sido activado'
                });
        });
    });
}

//Desactivar un usuario
const desactivar = async (req, res) => {
    const { id } =  req.params;
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users set activo = 0 WHERE id = ?',[id],
            (err, rows) => {
                if (err) reject(err.message);
                res.json({
                    ok: true,
                    text:'El usuario ha sido desactivado'
                });
        });
    });
}
 */

module.exports = {
    getAll,
    getOne,
    eliminar,
    update,
    /* activar,
    desactivar */
}