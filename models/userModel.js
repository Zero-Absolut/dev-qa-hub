import { Sequelize } from "sequelize";
import conn from "../database/database.js";


const Usuarios = conn.define('usuarios',{
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


// force: false ele não vai criar a tabela caso ela já exista 
Usuarios.sync({force: false}).then(() => {

}).catch((err) => {
    console.log("Erro ao criar tabela");
});

export default Usuarios;