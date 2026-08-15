export interface Task {
  id: number;      // Ex: "123"
  title: string;  // Ex: "Estudar Node"
  description : string; // Ex: "ver de assunto x até y, focando em z. Fazer isso até data w"
  completed: boolean; // Ex: false
  createdAt?: Date;
}

export type CreateTask = Omit<Task, 'id' | 'completed'>;