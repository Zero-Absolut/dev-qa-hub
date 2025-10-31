import express from  'express';
import * as validationMiddleware from '../middlewares/validationDataUser.js';
import * as inserUser from '../controller/UserController.js';


const route = express.Router();


route.get('/index', (req, res) => {
    res.render('index');
})
route.get('/perguntar', (req, res) => {
    res.render('perguntar');
})

route.get('/form-cadastro', (req, res) => {
    res.render('form-cadastro');
})

route.post('/form-cadastro', validationMiddleware.userValidationRules, validationMiddleware.validateCheck, inserUser.DataUser);



export default route;