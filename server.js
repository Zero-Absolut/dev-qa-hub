import express from 'express';
import authRoutes from './routes/routes.js'
import conn from './database/database.js';
import session from 'express-session';



const SESSION_SECRET = process.env.SESSION_SECRET || 'bC4rTqJmX2vP0sY8nD5gF1zH6wL7kE9uI3oA'; 

// MIDDLEWARE DE SESSÃO
app.use(session({
  secret: SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  cookie: { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
  }
}));


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