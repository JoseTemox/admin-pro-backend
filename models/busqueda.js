const { Schema, model } = require('mongoose');

 

const BusquedaSchema = Schema({
    criterio: {
        type: String,
        required: true

    }
});
// }, {collection: 'hospitales'});

BusquedaSchema.method('toJSON', function() {
    const {__v,  ...Object} = this.toObject();

    return Object;
})

module.exports = model('Busqueda', BusquedaSchema);