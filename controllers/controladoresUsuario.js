const Usuario = require ('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const controladoresUsuario = {
    obtenerTodosLosUsuarios:async (req, res) => {
        let error = null
        let respuesta = []
        try{
           const usuarios = await Usuario.find()
           usuarios.map( usuario =>{
              return respuesta.push({nombre:usuario.nombre, apellido:usuario.apellido, mail:usuario.mail, foto:usuario.foto,  _id:usuario._id })
            })
            res.json({success: true, response: respuesta})
        }catch(error){
            res.json({success: false, response: null})
        }
    },
    agregarNuevoUsuario : (req, res) => {
        const {nombre, apellido, mail, contrasenia, foto, peliculasLikeadas, google} = req.body
        let cryptPass = bcryptjs.hashSync(contrasenia)
        const nuevoUsuario = new Usuario ({nombre, apellido, mail, contrasenia:cryptPass, foto, peliculasLikeadas, google})
        Usuario.findOne({mail:mail})
        .then((usuario)=>{
            if(usuario){
                res.json({success:false, error:[{message:'Este correo ya esta en uso'}]})
            }else{
                nuevoUsuario.save()
                .then((nuevoUsuario) =>{
                    const token = jwt.sign({...nuevoUsuario}, process.env.SECRETKEY)
                    res.json({success:true, response:{nombre:nuevoUsuario.nombre, foto:nuevoUsuario.foto, token, _id:nuevoUsuario._id, apellido:nuevoUsuario.apellido, contrasenia:nuevoUsuario.contrasenia}, error:null})
                }) 
                .catch((error) => res.json({success:false, response:error}))
            }
        })
        .catch((error) => res.json({success:false, response:null, error: error.message}))
    },
    ingresarUsuario : async(req, res) => {
        const { mail, contrasenia, flagGoogle} = req.body
        console.log(mail, contrasenia, flagGoogle)

        try{
            await Usuario.findOne({mail:mail})
            .then((usuario) =>{
                console.log(usuario)
                if(!usuario) res.json({success:false, error:[{message:'El mail no esta registrado'}]})
                if(usuario.google && !flagGoogle) res.json({success:false, error:[{message:'Haz creado una cuenta con google, por favor ingrese con ella'}]})
                let correctPass = bcryptjs.compareSync(contrasenia, usuario.contrasenia)
                if(!correctPass) res.json({success:false, error:[{message:'Correo o contraseña incorrectas'}]})
                const token = jwt.sign({...usuario}, process.env.SECRETKEY)
                res.json({ success:true, response:{token, nombre:usuario.nombre, foto:usuario.foto,  _id:usuario._id, apellido:usuario.apellido, contrasenia:usuario.contrasenia}})
            })
            .catch ((error) => res.json({success:false, error:error.message}))
        }catch(err){
            console.log(err)
        }
    },
    eliminarUsuario :(req, res) =>{
        Usuario.findOneAndDelete({_id:req.params.id})
        .then(() =>res.json({success:true}))
        .catch((error) => res.json({success:false, response:error.message}))
    },
    editarUsuario:(req, res) =>{

        if(req.body.contrasenia){

            let cryptPass = bcryptjs.hashSync(req.body.contrasenia)
            let contraseniaNueva = {'contrasenia' : cryptPass }

            Usuario.findOneAndUpdate({_id:req.params.id}, {...contraseniaNueva})
            .then(() => res.json({success:true}))
            .catch((error) => res.json({success:false, response:error.message}))
        }else{
            Usuario.findOneAndUpdate({_id:req.params.id}, {...req.body})
            .then(() => res.json({success:true}))
            .catch((error) => res.json({success:false, response:error.message}))
        }
    },
    verifyToken : (req, res) => {
        res.json({succes:true, response:{nombre: req.user.nombre, foto:req.user.foto, _id:req.user._id}})
    }
}

module.exports= controladoresUsuario