import { CreateTodoDto, UpdateTodoDto } from "../dtos/todos";
import { TodoEntity } from "../entities/todo/todo.entity";

export abstract class TodoDataSource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  abstract findAll(): Promise<TodoEntity[]>;
  abstract findById(id: string): Promise<TodoEntity>;
  abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  abstract delete(id: string): Promise<TodoEntity>;
}
