const { Router } = require('express');
const { getAll, getOne, eliminar, update, /* activar, desactivar */ } = require('../controllers/usersController');


const router = Router();

router.get('/users/list', getAll);
router.get('/users/:id', getOne);
router.delete('/users/:id', eliminar);
router.put('/users/:id', update);
/* router.put('/users/ac/:id', activar);
router.put('/users/in/:id', desactivar); */

module.exports = router;