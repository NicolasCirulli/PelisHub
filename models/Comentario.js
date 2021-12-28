
const mongoose = require('mongoose')

const comentarioSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    idPelicula: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Usuario", required: true }],
    },
    idUsuario: {
        type: [{ type: mongoose.Types.ObjectId, ref: "", required: true }],
    },
    likes: { type: Array }

})

const Comentario = mongoose.model('comentario', comentarioSchema)

module.exports = Comentario