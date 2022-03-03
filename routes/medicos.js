/**
 *      Medicos
 *      ruta: '/api/medicos'
 */



 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');


 const { validarJWT } = require('../middlewares/validar-jwt');
 const {
     getMedicos,
     crearMedico,
     actualizarMedico,
     borrarMedico,
     getMedicoById
 }= require('../controllers/medicos')

 const router = Router();

 //consulta todos los Medicos
 router.get('/',validarJWT, getMedicos);




 //crear un nuevo medico
 router.post('/',
    [
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('hospital','el hospital debe ser un id valido').isMongoId(),
        validarCampos


    ],
     crearMedico
 );

 //actualizar usuario
 router.put('/:id',
     [
        validarJWT,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('hospital','el hospital debe ser un id valido').isMongoId(),
        validarCampos
     ],
     actualizarMedico
 );

     //borrar usuario
 router.delete('/:id',
    validarJWT,
    borrarMedico
 );



 router.get('/:id',
    validarJWT,
    getMedicoById
 );





 module.exports = router;