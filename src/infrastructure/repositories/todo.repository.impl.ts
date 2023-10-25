import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasource: TodoDataSource) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  async findAll(): Promise<TodoEntity[]> {
    return this.datasource.findAll();
  }
  async findById(id: string): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDto);
  }
  async delete(id: string): Promise<TodoEntity> {
    return this.datasource.delete(id);
  }
}
