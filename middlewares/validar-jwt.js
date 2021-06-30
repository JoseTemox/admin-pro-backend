const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{

    //leer el TOken desde las cabeceras, se puede probar con la app postman
    const token = req.header('x-token');
    // console.log(token);

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        //console.log(uid);

        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    //funcion que se llama si todo sale bien 
   
}


module.exports = {
    validarJWT
}