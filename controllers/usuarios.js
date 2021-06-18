
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario')

const getUsuarios = async (req, res) => {

    const usuarios = await  Usuario.find({}, 'nombre email role google');
    res.json({
        ok:true,
        usuarios
    });
}


const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    
    
    
    //validar si usuario existe
    try {

        const existeEmail = await Usuario.findOne({ email });
        
        
        //validacion para el email
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El Correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body);

        //encriptar la clave
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);


        //grabar usuario en la base de datos
        await usuario.save();
    
        res.json({
            ok:true,
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });    
    }

  
}

const actualizarUsuario = async (req, res = response) => {
          // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id

    try {

        //validar si existe el usuarui primero
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Actualizaciones, y elimina los campos que no se quieren actualizar
        //en la linea de abajo se eliminan los campos google y passwordvemail
        const {password, google,email, ...campos} = req.body;

        if(usuarioDB.email !== email){
           
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;

  

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new: true});

  

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

        
    }


}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}