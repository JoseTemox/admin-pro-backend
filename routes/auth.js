/**
 * Path: '/api/login'
 * 
 */





const { Router } = require('express');
const { login, googleSignIn, renewtoken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post( '/',
    [
        check('email', 'EL correo es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria').not().isEmpty(),
        validarCampos
        
    ],
    login
);


router.post( '/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
        
    ],
    googleSignIn
);


router.get( '/renew',
    validarJWT,
    renewtoken
)










module.exports = router;