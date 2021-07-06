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

//consulta todos los hospitals
router.get('/', getHospitales);




//crear un nuevo hospital
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

//actualizar hospital
router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

    //borrar hospital
router.delete('/:id',
    validarJWT,
    borrarHospital   
);





module.exports = router;