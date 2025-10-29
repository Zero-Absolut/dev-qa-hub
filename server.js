import express from 'express';
import authRoutes from './routes/routes.js'






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