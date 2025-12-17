import express from  'express';
import * as validationMiddleware from '../middlewares/validationDataUser.js';
import * as userDataRules from '../controller/UserController.js';
import * as login from '../middlewares/loginUserValidator.js';
import { requireLogin , logout} from '../middlewares/sessionVerificarion.js';
import { indexController, searchQuestion, getSidebarTopics, pQuestions } from '../controller/homeController.js';


const route = express.Router();


route.get('/index', indexController);

route.get('/perguntar', requireLogin, (req, res) => {
    const erros = req.session.Erros; // pega o erro da session
    req.session.Erros = undefined;   // limpa para não repetir o modal
    
    res.render('perguntar', { erros });     
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

    res.redirect('login');
})

route.post('/pesquisar', searchQuestion);

route.get('/viewPerguntas', (req, res)=> {
    
})

route.get('/topicos', (req, res) => {
    res.render('topicos', { req });
})

route.get('/detalhesPergunta', getSidebarTopics, pQuestions);



export default route;