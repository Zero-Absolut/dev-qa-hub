import { body, validationResult } from "express-validator";
import validator from "validator";


//import { validateCheck } from "./validationDataUser";

export const loginValidationRules = [
    body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .normalizeEmail()
    .withMessage('O e-mail informado ineválido'),

    body('password')
    .trim()
    .isLength({min : 6})
    .withMessage('A senha deve ter no mínimo 6 caracteres.')
]


export function validerLogin (req, res, next){
    const errors = validationResult(req);

        if(errors.isEmpty()){
            return next();
        }

        const loginErrors = errors.array();


        console.log(loginErrors);

        return res.render('login', {
            erros: loginErrors,
            
        });
}


export function questionVerify(req, res, next){
    
    const title = req.body.titulo;
    const question = req.body.pergunta;

    if (!validator.isEmpty(title) && !validator.isEmpty(question)) {
    return next();
        }
        else{


        req.session.Erros = {'msgErrorTitle': "Campo título não pode ser vazio", 'msgErrorQuestion': "campo de perguntas não pode ser vazio"};
            console.log(req.session.Erros);
            
        return res.redirect('/perguntar');
    }
}





