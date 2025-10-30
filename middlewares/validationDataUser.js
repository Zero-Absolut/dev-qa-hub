import { body, validationResult } from 'express-validator';

//sanitização dos dados

export const userValidationRules = [
    
    // nome

    body('nome')
        .trim()
        .escape() 
        .isLength({ min: 3, max: 50 })
        .withMessage('O nome deve ter entre 3 e 50 caracteres.'),
    
    // email

    body('email')
        .trim()
        .toLowerCase()  
        .normalizeEmail() 
        .isEmail()
        .withMessage('O email informado é inválido.'),
        
    // senha

    body('senha')
        .trim() 
        .isLength({ min: 6 })
        .withMessage('A senha deve ter no mínimo 6 caracteres.'),

    // conf senha

    body('confirmacao_senha')
        .trim() 
        // Usando uma função para verificar se a senhas são iguas

        .custom(function (value, { req }) {
            if (value !== req.body.senha) {
                throw new Error('A confirmação de senha não confere.');
            }
            return true;
        }),
        
    // termos de uso

    body('termos')
        .toBoolean() 
        // verificando se foi aceito

        .custom(function (value) {
            if (value !== true) {
                throw new Error('É necessário aceitar os termos de uso.');
            }
            return true;
        })
];




export function validateCheck(req, res, next) {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next(); 
    }

    //preparando erros
    const validationErrors = errors.array();

    // Ponto 2: Verifique os erros detalhados.
    console.log('Resultado: Erros Encontrados!');
    console.log('Erros de Validação (validationErrors):', validationErrors);
    
    //preparando dados para serem enviados
    
    const oldData = req.body;
    
   //remover a senha antes de mandar de volta
    delete oldData.senha; 
    delete oldData.confirmacao_senha; 
    
    //passando os dados de volta
    return res.render('form-cadastro', { 
        errors: validationErrors, // Array de erros
        oldData: oldData          // Dados preenchidos
    });
}
