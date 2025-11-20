
import bcrypt from 'bcrypt';
import Usuarios from '../models/userModel.js';

export async function insertDataUser(name, email, password){
    try {
        await Usuarios.create({
            nome: name,
            email: email,
            senha: password
        });
        
        return { success: true };

    } catch (err) {
        console.error(err);
        return {'success': false, 'msg': "Erro ao cadastrar usuário!!!"};
    }
}

export async function loginUser(email, password){
        try{
          const user = await Usuarios.findOne({
                where:{email: email}
                
            });

            if(!user){
                 console.log(user.senha)
                return {'success': false, 'msg' : "Usuário ou senha incorretos."}

                
                
            }

            //VERIFICAR O ERRO DE HASH DE SNHA NO CONTROLLER QUE IMPEDE DE VERIFICAR A SENHA CORRETAMENTE 
            const passwordChek = await bcrypt.compare(password, user.senha);

            if(passwordChek){
                return {'success': true, 'user': user.id};
            }else{
                 
                return {'success': false, 'msg': "Usuário ou senha incorretos."}
            }
        }catch( error){
            return {'success': false, 'msg': "Erro inesperado."}
        }
}