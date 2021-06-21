/**
 * Path: '/api/login'
 * 
 */





const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post( '/',
    [
        check('email', 'EL correo es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria').not().isEmpty(),
        validarCampos
        
    ],
    login
)










module.exports = router;