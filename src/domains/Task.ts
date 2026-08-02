export interface Task {
  id: string;      // Ex: "123"
  title: string;  // Ex: "Estudar Node"
  description : string; // Ex: "ver de assunto x até y, focando em z. Fazer isso até data w"
  done: boolean; // Ex: false
}

export type CreateTask = Omit<Task, 'id' | 'done'>;