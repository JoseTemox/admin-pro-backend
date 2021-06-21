/*
    Ruta: /api/usuarios

*/




const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsuarios, crearUsuario,actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//consulta todos los usuarios
router.get('/', validarJWT, getUsuarios);




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
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').not().isEmpty(),
        check('role', 'el rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

    //borrar usuario
router.delete('/:id',
    validarJWT,
    borrarUsuario   
);





module.exports = router;