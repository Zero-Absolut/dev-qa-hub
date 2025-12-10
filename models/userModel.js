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
    },
    usuarioId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// definindo o relacionamento
Usuarios.hasMany(Perguntas, { foreignKey: 'usuarioId' });
Perguntas.belongsTo(Usuarios, { foreignKey: 'usuarioId' });


Perguntas.sync({force:false}).then(() => {
    console.log("Tabela Perguntas criada/sincronizada");
}).catch((err) => {
    console.log("Erro ao criar tabela perguntas", err);
});

Usuarios.sync({force: false}).then(() => {
    console.log("Tabela Usuarios criada/sincronizada");
}).catch((err) => {
    console.log("Erro ao criar tabela usuarios", err);
});
