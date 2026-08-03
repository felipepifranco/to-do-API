import { type Task, type CreateTask } from "../domains/Task.js";
import { DoesntExist } from "../types/Error.js";

import { prisma } from "../config/prismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


class TarefaService {
  
  // criar tarefas
  async create({ title, description = "" }: CreateTask) : Promise<Task> {
    
    if (!title) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      }
    });
    
    return newTask;
  }
  
  // listar tarefas
  async list(completed? : boolean) : Promise<Task[]>{
    const tasks = await prisma.task.findMany();
    if (completed !== undefined) {
      return tasks.filter((task : Task)=> task.completed === completed);
    }
    return tasks;
  }



  // método para buscar uma tarefa específica pelo ID
  async search(id_ :number) : Promise<Task>{
    const task = await prisma.task.findUnique({ where: { id: id_ } });

    if(task === null){
      throw new DoesntExist("Tarefa não encontrada!");
    } else{
      return task
    }
  }

  // método para editar uma tarefa
  async editTask(id_ : number, title_? : string, description_? : string, completed_?: boolean){
    try{
      if(title_){
        await prisma.task.update({ where: { id: id_ }, data: { title: title_ } })
      }
      
      if(description_){
        await prisma.task.update({ where: { id: id_ }, data: { description: description_ } })
      }
      
      if(completed_ !== undefined){
        await prisma.task.update({ where: { id: id_ }, data: { completed: completed_ } })
      }

      return this.search(id_);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      
      throw error; 
    }
  }

  // método para deletar uma tarefa
  async deleteTask(id_:number){    
    try {
      await prisma.task.delete({ where: { id: id_ } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new DoesntExist('Tarefa não encontrada.');
      }
      throw error; 
    }
  }
}

export { TarefaService };