const express = require('express')
const controladoresUsuario = require ('../controllers/controladoresUsuario')
const controladoresComentario = require ('../controllers/controladoresComentario')
const passport = require("../config/passport")
const Router = require('express').Router();
const validador = require("../controllers/validador");
const { get } = require('mongoose');

const {obtenerTodosLosUsuarios,agregarNuevoUsuario, ingresarUsuario, eliminarUsuario, editarUsuario, verifyToken,agregarAFavoritos} = controladoresUsuario
const {agregarNuevoComentario,getCommentForMovies,updateComment,deleteComment,likeComment} = controladoresComentario


Router.route("/user/registrarse")
.post(validador,agregarNuevoUsuario)

Router.route("/usuarios")
 .get(obtenerTodosLosUsuarios)

Router.route("/user/ingresar")
 .post(ingresarUsuario)
 
Router.route("/user/:id")
 .delete(eliminarUsuario)
 .put(editarUsuario)

Router.route('/usuario/like/:id')
.put(agregarAFavoritos)
 
Router.route ("/verifyToken")
 .get(
     passport.authenticate('jwt', {session:false}),
     verifyToken
     )

// Ruta comentario

Router.route("/user/comentario")
 .post(agregarNuevoComentario)

Router.route("/user/comentario/:id")
.get(getCommentForMovies) 
.put(updateComment)
.delete(deleteComment)

Router.route("/user/comentario/likes/:id")
.put(likeComment)

module.exports = Router