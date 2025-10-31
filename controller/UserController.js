import bcrypt from 'bcrypt';
import { insertDataUser } from '../services/userServices.js';

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
