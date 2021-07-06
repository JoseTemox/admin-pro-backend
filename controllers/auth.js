const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const {email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Error de correo'
            })
        }


        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el token JWT

        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try 
    {

        const { name, email, picture } =  await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB){
            //si usuario no existe
            usuario = new Usuario({
                nombre: name,
                email,//en es6 no es necesario volver a asignar email:email
                password: '@@@',//se coloca cualquier cosa porque el usuario viene de google
                img: picture,
                googel: true
            });
        }else{
            //existe
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardar en DB
        await usuario.save();

        //generar el token JWT

        const token = await generarJWT( usuario.id);

        res.json({
            ok: true,
            msg: 'Google SignIn',
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
        
    }

    
}
const renewtoken = async (req, res = response) => {
    const uid = req.uid;

    //generar el token - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewtoken
}