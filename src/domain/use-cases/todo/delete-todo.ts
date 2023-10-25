import { TodoEntity } from "../../entities/todo/todo.entity";
import { TodoRepository } from "../../repository/todoRepository";

export interface DeleteTodoUseCase {
  execute(id: string): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): Promise<TodoEntity> {
    return this.repository.delete(id);
  }
}
