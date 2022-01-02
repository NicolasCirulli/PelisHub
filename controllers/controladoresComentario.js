const Comentario = require('../models/Comentario')

const controladoresComentario = {
    agregarNuevoComentario: (req, res) => {
        const { comentario,idPelicula,comentaryPhoto, idUsuario } = req.body
        const nuevoComentario = new Comentario(
            {
                comentario,
                idPelicula,
                comentaryPhoto,
                idUsuario

            })

        nuevoComentario.save()
            .then((nuevoComentario) => {
                res.json({ success: true, response: { nuevoComentario }, error: null })
            })
            .catch((error) => res.json({ success: false, response: error }))
    },

     getCommentForMovies: async function (req, res) {
         let comentario
         const id = req.params.id
     

         try {
             comentario = await Comentario.find({ idPelicula: id })

         } catch (error) {
             console.log(error)
         }
         res.json({ response: comentario, success: true })
     },

     updateComment: async (req, res) => {

        let id = req.params.id
        let comentario = req.body
        let actualizado
        try {
            actualizado = await Comentario.findOneAndUpdate({ _id: id }, comentario, { new: true })
       
        } catch (error) {
            console.log(error)
        }
        res.json({ success: actualizado ? true : false })

    },


    deleteComment: async (req, res) => {
        const id = req.params.id
        let comentario
        try {
            await Comentario.findOneAndDelete({ _id: id })
            comentario = await Comentario.find()

        } catch (error) {
            console.log(error)
        }

        res.json({ response: comentario, success: true })
    },

    likeComment: (req, res) => {
        let idUser = req.body
        Comentario.findOne({ _id: req.params.id })
            .then((comentario) => {
               
                if (comentario.likes.includes(idUser.idUser  )) {
                 
                    Comentario.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: idUser.idUser} }, { new: true })
                    .then((newComment) => res.json({ success: true, response: newComment.likes }))
                    .catch((error) => console.log(error))

                }
                else {
                   
                    Comentario.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: idUser.idUser} }, { new: true })
                        .then((newComment) => res.json({ success: true, response: newComment.likes }))
                        .catch((error) => console.log(error))
                }
            })
        .catch((error) => res.json({ success: false, response: error }))
    }


}

module.exports= controladoresComentario