import Joi from '@hapi/joi';


//Registre Validation
const registreValodation=data=>{
    const schema=Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return schema.validate(data);    
}

//Login Validation
const loginValodation=data=>{
    const schema=Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return schema.validate(data);    
}

export {registreValodation,loginValodation};
