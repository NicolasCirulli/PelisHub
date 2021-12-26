const express = require('express')
const controladoresUsuario = require ('../controllers/controladoresUsuario')
const passport = require("../config/passport")
const Router = require('express').Router();
const validador = require("../controllers/validador")

const {agregarNuevoUsuario, ingresarUsuario, eliminarUsuario, editarUsuario, verifyToken} = controladoresUsuario

Router.route("/user/registrarse")
 .post(validador,agregarNuevoUsuario)
 
Router.route("/user/ingresar")
 .post(ingresarUsuario)
 
Router.route("/user/:id")
 .delete(eliminarUsuario)
 .put(editarUsuario)
 
Router.route ("/verifyToken")
 .get(
     passport.authenticate('jwt', {session:false}),
     verifyToken
     )

module.exports = Router