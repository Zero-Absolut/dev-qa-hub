import express from 'express';
import authRoutes from './routes/routes.js'
import conn from './database/database.js';
import session from 'express-session';





conn.authenticate()
  .then(() => console.log("✅ Conectado!"))
  .catch((err) => console.error(" Erro ao conectar ao MySQL:", err.message));



const app = express();

// CHAVE SECRETA GERADA PARA ESTUDOS (ESTÁTICA)
// ATENÇÃO: Em produção, o valor seria obtido de 'process.env.SESSION_SECRET'
const SECRET_KEY = '5a707e4c2f8b5d3a1e9c8f0b7d6a4e3c2b1a0987654321fedcba987654321fedcba987654321fedcba'; 

// 1. Aplicar o Middleware de Sessão
app.use(session({
  // ESSENCIAL: Chave para assinatura do Cookie
  secret: SECRET_KEY, 
  
  // Opções de Performance e Comportamento
  resave: false, 
  saveUninitialized: false, 

  // Configurações do Cookie (Segurança)
  cookie: {
    // Usamos false, pois em ambiente de estudo (localhost), o HTTPS não é comum.
    secure: false, 
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 24 // Cookie dura 24 horas
  }
}));



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