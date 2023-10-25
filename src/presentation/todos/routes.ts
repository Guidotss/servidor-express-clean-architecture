import { Router } from "express";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";
import { TodoController } from "./controllers";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const todoController = new TodoController(todoRepository);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodo);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
