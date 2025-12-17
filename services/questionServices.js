import { Perguntas, Usuarios } from "../models/userModel.js"; // importo os models Perguntas e Usuarios
import { Op } from "sequelize"; // importo o operador do Sequelize para filtros complexos

// Função para buscar as últimas perguntas
export async function getLastQuestions() {
    try {
        const questions = await Perguntas.findAll({
            // Aqui estou incluindo a tabela Usuarios para pegar o usuário que criou a pergunta
            include: [{
                model: Usuarios,         // modelo relacionado
                attributes: ['nome']     // escolho quais campos do usuário quero trazer, aqui só o nome
            }],
            order: [['createdAt', 'DESC']], // ordeno do mais recente para o mais antigo
            limit: 4                        // trago apenas as 4 últimas perguntas
        });

        return questions; // retorno as perguntas com o usuário incluído
    } catch (err) {
        console.error("Erro ao fazer consulta", err); // caso dê erro, log no console
        return []; // retorno um array vazio para não quebrar a aplicação
    }
}

// Função para buscar perguntas filtradas por título ou conteúdo
export async function getQuestionFilter(filter) {
    try {
        const questionFilter = await Perguntas.findAll({
            where: {
                // aqui faço um filtro usando OR: título ou pergunta contêm o que foi digitado
                [Op.or]: [
                    { title: { [Op.like]: `%${filter}%` } },
                    { pergunta: { [Op.like]: `%${filter}%` } }
                ]
            },
            include: [{ 
                model: Usuarios,        // incluo o usuário que fez a pergunta
                attributes: ['nome']    // só quero o nome
            }],
            order: [['createdAt', 'ASC']] // ordeno do mais antigo para o mais recente
        });

        return questionFilter; // retorno as perguntas filtradas com o usuário
    } catch (err) {
        console.error("Erro ao fazer consulta.", err); // log de erro
        return []; // retorno um array vazio se algo der errado
    }
}


export async function oneQuestion(id) {
    try {
        const question = await Perguntas.findOne({
            where:
                {id: id},
                include: [
                {
                    model: Usuarios,
                    attributes: ['id', 'nome', 'email']
                }
            ]
            
        })

        return question;

    }catch(err){
        console.error("Erro ao fazer busca", err)
        return null;
    }
}


