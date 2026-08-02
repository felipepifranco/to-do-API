// src/index.ts
import express from 'express';
import { tarefaRoutes } from './routes/task.routes.js';


const app = express();
const PORTA = 3333;

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json()); 

// rotas utilizando o routes
// qualquer requisição com '/tasks' será mandada para o router de tarefas
app.use('/tasks', tarefaRoutes);

// --- FIM DAS ROTAS ---

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});