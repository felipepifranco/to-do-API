import express from 'express';
import { tarefaRoutes } from '../routes/task.routes';

const app = express();

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json()); 

// rotas utilizando o routes
// qualquer requisição com '/tasks' será mandada para o router de tarefas
app.use('/tasks', tarefaRoutes);

export {app}