const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true

    },
    img: {
        type: String,
    },
    usuario: {
        //establece la relacion de este document con la referencia definida a continuacion
        // required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    


});
// }, {collection: 'hospitales'});

HospitalSchema.method('toJSON', function() {
    const {__v,  ...Object} = this.toObject();

    return Object;
})

module.exports = model('Hospital', HospitalSchema);