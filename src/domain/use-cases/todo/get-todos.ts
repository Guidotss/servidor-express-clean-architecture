import { TodoEntity } from "../../entities/todo/todo.entity";
import { TodoRepository } from "../../repository/todoRepository";

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.findAll();
  }
}