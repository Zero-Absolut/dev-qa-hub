import { Sequelize } from "sequelize";

const conn = new Sequelize('parguntas', 'root', 'nirvana22', {
    host:'localhost',
    dialect:'mysql'
});

export default conn;