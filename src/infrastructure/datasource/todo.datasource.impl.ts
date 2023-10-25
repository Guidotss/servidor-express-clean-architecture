import { prisma } from "../../data/mongo";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
  CustomError,
} from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }
  async findAll(): Promise<TodoEntity[]> {
    try {
      const todos = await prisma.todo.findMany();
      return todos.map((todo) => TodoEntity.fromObject(todo));
    } catch (error) {
      console.log(error);
      throw new Error(error as unknown as string);
    }
  }
  async findById(id: string): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404);

    return TodoEntity.fromObject(todo);
  }
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const todo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        completed: updateTodoDto.completed,
        category: updateTodoDto.category,
      },
    });

    return TodoEntity.fromObject(todo);
  }
  async delete(id: string): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({
      where: { id },
    });

    return TodoEntity.fromObject(deleted);
  }
}
