const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');




const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    //validar el tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hospital valido (tipo)'
        })
    }

    //validacion que exista o traiga el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok: false,
        msg: 'No hay archivo'
    });
    }


    //procesar la imagen
    const file = req.files.imagen;//se define como se llame por el formularios
    
    //extraer la extencion
    const nombreCortado = file.name.split('.');//// nombre.1.2.3.jpg es un arreglo donde hay que traer la ultima posicion
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida png, jpg, jepg, gif'
        });

    }

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${ extensionArchivo }`;


    //ruta path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;


    //mover la imagen
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg:'Error al mover la imagen'
            });
        }

        //actualizar imagen
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Arvhivo subido',
            nombreArchivo
        })
    });

}

const retornaImagen = (req , res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    console.log('aqui');


    const pathImg = path.join(__dirname, `../uploads/${tipo}/${ foto }`);


    //imagen por defecto si no existe 
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else {
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);

        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
    
}