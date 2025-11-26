
import bcrypt from 'bcrypt';
import {Usuarios, Perguntas} from '../models/userModel.js';

export async function insertDataUser(name, email, password){
    try {
        await Usuarios.create({
            nome: name,
            email: email,
            senha: password
        });
        
        return { 'success': true };

    } catch (err) {
        console.error(err);
        return {'success': false, 'msg': "Erro ao cadastrar usuário!!!"};
    }
}


export async function insertPost(t, p) {
    try{
        await Perguntas.create({
            pergunta: p,
            title: t
        });

        return {'seccess': true};
    } catch (err){
        console.log(err);

        return {'success': false, 'msgError': "Erro ao fazer pergunta"};
    }
}

export async function loginUser(email, password){
    try{
        const user = await Usuarios.findOne({
            where: { email: email },
            attributes: ['id', 'nome', 'email', 'senha'] 
        });

        if (user) { 

            const passwordChek = await bcrypt.compare(password, user.senha);
            
            if (passwordChek) {

                return {'success': true, 'user': user.id, 'userName': user.nome};
            } else {

                return {'success': false, 'msg': "Usuário ou senha incorretos."}
            }
        } else {

            return {'success': false, 'msg': "Usuário ou senha incorretos."}
        }
        
    } catch(error) {
       
        return {'success': false, 'msg': "Erro inesperado."}
    }
}