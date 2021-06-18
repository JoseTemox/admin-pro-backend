/*
    Ruta: /api/usuarios

*/




const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsuarios, crearUsuario,actualizarUsuario } = require('../controllers/usuarios');

const router = Router();

//consulta todos los usuarios
router.get('/', getUsuarios);




//crear un nuevo usuario
router.post('/',
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearUsuario
);

//actualizar usuario
router.put('/:id', 
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').not().isEmpty(),
        check('role', 'el rol es obligatorio').not().isEmpty(),
    ],
    actualizarUsuario
    );




module.exports = router;