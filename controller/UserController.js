import bcrypt from 'bcrypt';
import { insertDataUser, loginUser } from '../services/userServices.js';


export function DataUser(req, res) {
    const password = req.body.senha;

    const roud = 10;

    const salt = bcrypt.genSaltSync(roud);
    
    const hashPassword = bcrypt.hashSync(password, salt);

    const name = req.body.nome;

    const email = req.body.email;

    insertDataUser(name, email, hashPassword).then(result => {
        
        if(result.success){
            res.redirect('/login');
        }else{
            res.redirect('/erro');
        }

    }).catch(err => {
        console.log(err);
        res.redirect('/erro');
    });
   
}


export async function loginUserVerify(req, res){
    const emailUser = req.body.email;
    const password = req.body.password;
    
    const result = await loginUser(emailUser, password);

    if(result.success === true){
        req.session.userId = result.user;
        req.session.userName = result.userName;
        req.session.isAuthenticated = true;
     
        return res.redirect('/index');
    }else{
        console.log(result);

        return res.render('login', {'msg': result.msg})
    }
}