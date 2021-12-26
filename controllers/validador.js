const joi = require('joi')

const validador = (req, res, next) => {
    const schema = joi.object({
        nombre:joi.string().trim().min(2).required().messages({
            'string.empty' : 'You must complete this field',
            'string.min' : 'Invalid name',
        }),
        apellido:joi.string().trim().min(2).required().messages({
            'string.empty' : 'You must complete this field',
            'string.min' : 'Invalid Last name',
        }),
        mail:joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email' : 'You must use a valid email account'
        }),
        contrasenia:joi.string().min(5).trim().required().messages({
            'string.empty' : 'You must complete this field',
        }),
        foto:joi.string().min(5).trim().required().messages({
            'string.min': 'Please use a valid url'
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