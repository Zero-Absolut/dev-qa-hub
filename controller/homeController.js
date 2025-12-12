import { getLastQuestions, getQuestionFilter, oneQuestion } from "../services/questionServices.js";


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


export async function getSidebarTopics(req, res, next) {
    try {
        const topics = await getLastQuestions(); 
        req.sidebarTopics = topics;             
        next(); 

    } catch (err) {
        console.error("Erro ao carregar sidebar:", err);
        req.sidebarTopics = []; 
        next();
    }
}


export async function pQuestions(req, res) {

    try{
            const id = req.query.id;
            if(!id){
               return res.redirect('/index');

            }
            const pQuestion = await oneQuestion(id);

            if(!pQuestion){
               return res.render('detalhesPergunta', {perguntaP: null, msgErro: "Pergunta não encontrada", sidebarTopics:req.sidebarTopics});
            }
            console.log(pQuestion, req.sidebarTopics);

           return res.render('detalhesPergunta', {perguntaP: pQuestion, sidebarTopics:req.sidebarTopics});

    }catch(err){
        console.error("Erro inesperado ao consultar pergunta", err);

       return res.redirect('/index');
    }
}