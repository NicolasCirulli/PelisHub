const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre:{type: String, required:true},
    apellido:{type: String, default:" "},
    mail:{type: String, required:true},
    contrasenia:{type: String, required:true},
    foto:{type: String, required:true},
    peliculasLikeadas:{type:Array},
    google:{type:Boolean, default:false},
    rol: {type:String, default:'usuario'}
})

const Usuario = mongoose.model('usuario',usuarioSchema)

module.exports = Usuario