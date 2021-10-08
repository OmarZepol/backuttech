const express = require('express');
const cors = require('cors');
const { pool } = require('./database/config');
const morgan = require('morgan');
require('dotenv').config();

// Servidor de express
const app = express();
app.use(cors());
// Morgan para consola
app.use(morgan('dev'));
app.use(express.json());

// Puerto
app.listen(process.env.DB_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.DB_PORT}`);
});

// Rutas
app.use('/innov', require('./routes/auth'));
app.use("/innov", require("./routes/users"));