const { response } = require('express');

const Medico = require('../models/medicos');


const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img')

    res.json({
        ok: true,
        medicos
    })
}

const getMedicoById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                        .populate('usuario','nombre img')
                                        .populate('hospital','nombre img')
        res.json({
            ok: true,
            medico
        })

    } catch (error) {

        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }


}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body});

    try {

        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medico: medicoBD
        })

    } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Hable con el Administrador'
      })
    }


}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;


    try {

        const medico = await Medico.findById( id );

        if (!medico){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado'
            });
        }

        const cambioMedico = {
            ...req.body,//se trae todos los campos que se van actualizar de una vez
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambioMedico, { new: true});
        res.json({
            ok: true,
            medico: medicoActualizado
        });







    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }
}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;


    try {

        const medico = await Medico.findById( id );

        if (!medico){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);



        res.json({
            ok: true,
            medico: 'Medico borrado'
        });







    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });

    }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}