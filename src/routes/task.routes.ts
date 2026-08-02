// src/routes/tarefa.routes.ts

import { Router } from 'express';
import { TarefaController } from '../controllers/TaskController.js';

// Router() é um "mini-servidor" só para as rotas de tarefa
const tarefaRoutes = Router(); 
const controller = new TarefaController();

// "Porteiro, quando for POST em '/', chame o Gerente no método 'create'"
tarefaRoutes.post('/', controller.create);

// GET em '/tasks'
tarefaRoutes.get('/', controller.list);

// GET de um id específico
tarefaRoutes.get('/:id', controller.search);

// PUT
tarefaRoutes.put('/:id', controller.editTask);

// DELETE
tarefaRoutes.delete('/:id', controller.delete)

export { tarefaRoutes };