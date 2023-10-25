import { UpdateTodoDto } from "../../dtos/todos";
import { TodoEntity } from "../../entities/todo/todo.entity";
import { TodoRepository } from "../../repository/todoRepository";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.update(dto);
  }
}
