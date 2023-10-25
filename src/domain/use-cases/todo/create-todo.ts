import { CreateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo/todo.entity";
import { TodoRepository } from "../../repository/todoRepository";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
