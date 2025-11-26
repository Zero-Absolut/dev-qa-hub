import { Sequelize } from "sequelize";
import conn from "../database/database.js";


export const Usuarios = conn.define('usuarios',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    senha:{
        type: Sequelize.STRING, 
        allowNull: false
    }
});


export const Perguntas = conn.define('perguntas', {
    pergunta:{
        type: Sequelize.STRING,
        allowNull:false
    },
    title:{
        type: Sequelize.STRING,
        allowNull:false
    }
});


Perguntas.sync({force:false}).then(() => {

}).catch((err) => {
    console.log("erro ao criar tabela perguntas");
})


// force: false ele não vai criar a tabela caso ela já exista 
Usuarios.sync({force: false}).then(() => {

}).catch((err) => {
    console.log("Erro ao criar tabela");
});

