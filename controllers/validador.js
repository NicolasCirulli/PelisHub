const joi = require('joi')

const validador = (req, res, next) => {
    const schema = joi.object({
        nombre:joi.string().trim().min(2).required().messages({
            'string.empty' : 'Debes completar este campo',
            'string.min' : 'nombre no permitido',
        }),
        apellido:joi.string().trim().min(2).required().messages({
            'string.empty' : 'Debes completar este campo',
            'string.min' : 'apellido no permitido',
        }),
        mail:joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email' : 'Debes usar una cuenta de mail valida'
        }),
        contrasenia:joi.string().min(5).trim().required().messages({
            'string.empty' : 'Debes completar este campo',
        }),
        foto:joi.string().min(5).trim().required().messages({
            'string.min': 'Introduzca una direccion valida'
        }),
        google:joi.boolean(),
    })

    const verification = schema.validate(req.body, {abortEarly: false})

    if(!verification.error){
        next()
    }else {
        res.json({success:false, errors:verification.error.details})
    }
}

module.exports = validador