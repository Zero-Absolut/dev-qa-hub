import express from 'express';
import authRoutes from './routes/routes.js'
import conn from './database/database.js';



conn.authenticate()
  .then(() => console.log("✅ Conectado!"))
  .catch((err) => console.error(" Erro ao conectar ao MySQL:", err.message));



const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))

//middleware para ler form html padrão 

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const port = 3000;

app.use('/', authRoutes);


app.listen(port, () => {
    console.log(`servidor rodando na porta: ${port}`);
})