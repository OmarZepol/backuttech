const { pool } = require("../database/config");

//Obtener todos los proyectos
const getAll = async(req, res) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM solicitud', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
            console.log(rows);
            res.json({
                ok: true,
                text: 'Todas las solicitudes',
                data: rows
            });
        });
    });
}

//Obtener solo una
const getOne = async(req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM solicitud WHERE id = ?', [id],
            (err, rows) => {
                if (err) reject(err.message);
                if (rows.length > 0) {
                    res.json({
                        ok: true,
                        text: 'Obtiene solo una solicitud con el id: ' + id,
                        data: rows[0]
                    });
                } else {
                    res.json({
                        ok: false,
                        text: 'Solicitud no encontrada'
                    });
                }
            });
    });
}

//Crear una solicitud
const create = async(req, res) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO solicitud set ?', [req.body]);
        console.log(req.body);
        res.json({
            ok: true,
            text: 'Solicitud ' + req.body.asunto + ' creada'
        });
    });
}

//Borrar una solicitud
const eliminar = async(req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM solicitud WHERE id = ?', [id],
            (err, rows) => {
                if (err) reject(err.message);
                res.json({
                    ok: true,
                    text: 'Solicitud eliminada'
                });
            });
    });
}




module.exports = {
    getAll,
    getOne,
    create,
    eliminar
}