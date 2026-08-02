import { type Request, type Response } from 'express';
import { TarefaService } from '../services/TaskService.js';
import { DoesntExist } from '../types/Error.js';

// Uma classe que "sabe" gerenciar requisições de Tarefas
class TarefaController {
  
  // Um método para gerenciar a rota de CRIAR
  create(req: Request, res: Response) {
    try {
      // 1. Pega os dados da requisição (trabalho de Gerente)
      const { title, description } = req.body; // desestruturação
      
      // 2. Chama o "Trabalhador" (Service) para fazer a lógica
      const service = new TarefaService();
      const tarefa = service.create({ title, description });
      
      // 3. Devolve a resposta (trabalho de Gerente)
      return res.status(201).json(tarefa);
      
    } catch (error) {
      // 4. Se o "Trabalhador" der um erro (ex: "Nome é obrigatório"),
      // o Gerente avisa o Cliente.
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
  
  // listar tarefas
  list(req: Request, res: Response) {
    const service = new TarefaService();
    try{
      // filtro
      const completedFilter = req.query.completed;
      let isCompleted: boolean | undefined = undefined;

      if (completedFilter === 'true') {
        isCompleted = true;
      } else if (completedFilter === 'false') {
        isCompleted = false;
      }
      
      // listagem
      const tasks = service.list(isCompleted);
      return res.status(200).json(tasks);

    } catch(error){
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // buscar tarefa especifica
  search(req: Request, res: Response){
    try{
      const id = req.params.id as string;
      const service = new TarefaService();
      const task = service.search(id);
      return res.status(200).json(task);

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de tarefa inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  // atualizar uma tarefa
  editTask(req: Request, res: Response){
    try{
      const id = req.params.id as string;
      const { title, description, completed } = req.body;

      const service = new TarefaService();
      const task = service.editTask(id, title, description, completed);
      
      return res.status(200).json(task);
      
    }catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de tarefa inexistente" });
      } else if (error instanceof TypeError){
        return res.status(400).json({erro: error.message})
      } else {
      return res.status(500).json({ erro: "Erro interno do servidor" });
      }
    }
  }

  delete(req: Request, res: Response){
    try{
      const id = req.params.id as string;
      const service = new TarefaService();
      
      service.deleteTask(id);
      return res.status(204).send();

    } catch (error){
      if (error instanceof DoesntExist) {
        return res.status(404).json({ erro: "id de tarefa inexistente" });
      } else if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}

export { TarefaController };