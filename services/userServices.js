import Usuarios from "../models/userModel.js";

export function insertDataUser(name, email, password){
   return Usuarios.create({
        nome: name,
        email: email,
        senha: password
    }).then(() => {
        return { success: true };
    }).catch((err) => {
        return {'success':false,'errCad': "Erro ao cadastrar usuário!!!"};
    })
}