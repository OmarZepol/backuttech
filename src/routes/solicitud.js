const { Router } = require('express');
const { check } = require('express-validator');
const { validar } = require('../middlewares/validar_campos');
const { getAll, getOne, create, eliminar } = require('../controllers/solicitudController');

const router = Router();

router.get('/solicitud/list', getAll);
router.get('/solicitud/:id', getOne);
router.post('/solicitud/create', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty().isMobilePhone(),
        check('asunto', 'El asunto es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),

        validar
    ],
    create);
router.delete('/solicitud/:id', eliminar);

module.exports = router;