import { TodoEntity } from "../../entities/todo/todo.entity";
import { TodoRepository } from "../../repository/todoRepository";

export interface GetTodoUseCase {
  execute(id: string): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
