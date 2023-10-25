import { Request, Response } from "express";
import {
  CreateTodoDto,
  CustomError,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
  UpdateTodoDto,
} from "../../domain";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) { }

  private handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res
        .header("Content-Type", "application/json")
        .status(err.statusCode)
        .json({
          ok: false,
          error: err.message,
        });
    }
    return res
      .header("Content-Type", "application/json")
      .status(500)
      .json({ ok: false, error: "Internal server error" });
  };

  public getTodos = (_: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) =>
        res
          .header("Content-Type", "application/json")
          .json({ ok: true, todos })
          .status(200)
      )
      .catch((err) => this.handleError(err, res));
  };

  public getTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) =>
        res
          .header("Content-Type", "application/json")
          .json({ ok: true, todo })
          .status(200)
      )
      .catch((err) => this.handleError(err, res));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error)
      return res
        .header("Content-Type", "application/json")
        .status(400)
        .json(error);

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) =>
        res
          .header("Content-Type", "application/json")
          .status(201)
          .json({ ok: true, todo })
      )
      .catch((err) => this.handleError(err, res));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) {
      return res
        .header("Content-Type", "application/json")
        .status(400)
        .json(error); 
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) =>
        res
          .header("Content-Type", "application/json")
          .status(200)
          .json({ ok: true, todo })
      )
      .catch((err) => this.handleError(err, res));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) =>
        res
          .header("Content-Type", "application/json")
          .json({ ok: true, todo })
          .status(200)
      )
      .catch((err) => this.handleError(err, res));
  };
}
