import express from  'express';
import * as validationMiddleware from '../middlewares/validationDataUser.js';
import * as userDataRules from '../controller/UserController.js';
import * as login from '../middlewares/loginUserValidator.js';
import { requireLogin , logout} from '../middlewares/sessionVerificarion.js';


const route = express.Router();


route.get('/index', (req, res) => {
    console.log('Conteúdo Atual da Sessão:', req.session);
    res.render('index', { 
        req: req 
    });
})
route.get('/perguntar', requireLogin, (req, res) => {
    
    res.render('perguntar');
});

route.post('/perguntar', requireLogin, login.questionVerify, userDataRules.insertPostUser);

route.get('/form-cadastro', (req, res) => {
    res.render('form-cadastro');
})

route.post('/form-cadastro', validationMiddleware.userValidationRules, validationMiddleware.validateCheck, userDataRules.DataUser);

route.get('/login', (req, res) => {
    
    res.render('login');
})

route.post('/login', login.loginValidationRules, login.validerLogin, userDataRules.loginUserVerify);

route.post('/logout', logout, (req, res) => {

    res.render('login');
})

export default route;