const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

try {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.release();
        console.log('Conexión Correcta');
    });
}catch(error){
    console.log(error);
    throw new Error('Error al conectarse a la BD' + error);
}

module.exports = {
    pool
};
