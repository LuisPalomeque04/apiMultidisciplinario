const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/middleware.auth');
const contollerUsuarios = require('../controllers/controller_usuario')

router.get('/', verifyToken, contollerUsuarios.obtenerUsuarios);
router.get('/:numCuarto',verifyToken, contollerUsuarios.obtenerUsuarioPorNumCuarto);
router.post('/',verifyToken, contollerUsuarios.agregarUsuario)
router.put('/:numCuarto', verifyToken, contollerUsuarios.actualizarUsuario);
router.delete('/:numCuarto', verifyToken, contollerUsuarios.eliminarUsuario);

module.exports = router;
