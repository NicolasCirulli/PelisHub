
const mongoose = require('mongoose')

const comentarioSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    idPelicula: { type: String, required: true },
    comentaryPhoto: {type: String },
    idUsuario: {

        type: [{ type: mongoose.Types.ObjectId, ref: "Usuarios", required: true }],
    },
    likes: { type: Array }

})

const Comentario = mongoose.model('comentario', comentarioSchema)

module.exports = Comentario