import { type Task, type CreateTask } from "../domains/Task.js";
import { DoesntExist } from "../types/Error.js";

const localDB : Task[] = []; 

class TarefaService {
  
  // criar tarefas
  create({ title, description = "" }: CreateTask) : Task {
    
    if (!title) {
      throw new Error("Nome da tarefa é obrigatório");
    }
    
    // era objeto (json), mudei para Task a fim de garantir robustez ao lidar com o vetor
    const newTask :Task = { 
      id: Math.random().toString(), 
      title, 
      description, 
      done: false 
    };

    localDB.push(newTask);
    
    return newTask;
  }
  
  // listar tarefas
  list(completed? : boolean) : Task[]{
    // filtro
    if (completed !== undefined) {
      return localDB.filter(task => task.done === completed);
    }
    return localDB;
  }

  // método auxiliar para procurar o index de uma tarefa
  search_index(id: string) : number{
    if (!id || id.trim() === "") {
      throw new TypeError("id inválido!")
    }

    for (let i = 0; i < localDB.length; i++) {
      const task = localDB[i]
      
      if(task && id === task.id){
        return i;
      }
    }
    // se chegou até aqui, não achou
    throw new DoesntExist("Tarefa não encontrada!");
  }

  // método para buscar uma tarefa específica pelo ID
  search(id :string) : Task{
    return localDB[this.search_index(id)]!
  }

  // método para editar uma tarefa
  editTask(id : string, title? : string, description? : string, completed?: boolean){
    const index : number = this.search_index(id)
    
    if(title){
      localDB[index]!.title = title;
    }
    
    if(description){
      localDB[index]!.description = description;
    }
    
    if(completed !== undefined){
      localDB[index]!.done = completed;
    }

    return localDB[index]
  }

  // método para deletar uma tarefa
  deleteTask(id:string): void{
    //TODO: fazer 204 em vez de 404
    const index = this.search_index(id);
    
    localDB.splice(index, 1);
  }
}

export { TarefaService };