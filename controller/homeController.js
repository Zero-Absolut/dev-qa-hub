import { getLastQuestions, getQuestionFilter } from "../services/questionServices.js";


export async function indexController(req, res) {
    
    try{
        const question = await getLastQuestions();


        res.render('index', {perguntas: question, req: req, res: res});

    }catch(err){
        console.log("Erro no controller da index", err);

        res.render('index', {perguntas: [], msgError: "Não foi possível carregar as perguntas."});
    }
}

export async function searchQuestion(req, res) {
    const filter = req.body.pesquisaPergunta;

    try {
        const filterSan = await getQuestionFilter(filter);
        console.log(filterSan);
        res.render('viewPerguntas', {
            perguntasBuscadas: filterSan,
            msgErroPesquisa: null 
        });
    } catch (err) {
        console.error("Erro ao fazer pesquisa de perguntas.", err);
        res.render('viewPerguntas', {
            perguntasBuscadas: [],
            msgErroPesquisa: "Termo da consulta não encontrado."
        });
    }
}


export async function getSidebarTopics(req, res) {
    
    try {
        const getSidebarResult = await getLastQuestions();
        
        console.log(getSidebarResult);

        res.render('detalhesPergunta', {pergunta: getSidebarResult});

    }catch(err){
        console.error("Erro ao processar busca", err);
        res.render('detalhesPergunta', {pergunta: [], msgSideError: "Erro ao carregar tópico."});
    }
}