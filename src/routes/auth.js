const { Router } = require('express');
const { renuevaToken, registro, login } = require('../controllers/authController');
const { valitarJWT } = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const { validar } =  require('../middlewares/validar_campos');

const router = Router();

router.post('/login', [
    check('email','El correo es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validar
],  
login);  
router.post('/register', [
    check('email','El correo es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty().isLength({min:8}),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty().isMobilePhone(),
    check('perfil','El perfil es obligatorio').not().isEmpty().isNumeric(),
    validar
],
registro);
router.get('/renew', valitarJWT, renuevaToken);

module.exports = router;
