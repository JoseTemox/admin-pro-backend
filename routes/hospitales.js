/**
 *      Hospitales
 *      ruta: '/api/hospitales'
 */





const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}= require('../controllers/hospitales')

const router = Router();

//consulta todos los usuarios
router.get('/', getHospitales);




//crear un nuevo usuario
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

//actualizar usuario
router.put('/:id', 
    [
        
    ],
    actualizarHospital
);

    //borrar usuario
router.delete('/:id',
    borrarHospital   
);





module.exports = router;