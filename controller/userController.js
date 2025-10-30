import bcrypt from 'bcrypt';

export function DataUser(req, res) {
    const password = req.senha;

    const roud = 10;

    const salt = bcrypt.genSaltSync(roud);
    
    const hashPassword = bcrypt.genSaltSync(password, salt);

    const name = req.body.name;

    const email = req.body.email;

    const result = insertDataUser(name, email, hashPassword);

   

   
}
