"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const todo_datasource_impl_1 = require("../../infrastructure/datasource/todo.datasource.impl");
const todo_repository_impl_1 = require("../../infrastructure/repositories/todo.repository.impl");
const controllers_1 = require("./controllers");
class TodoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new todo_datasource_impl_1.TodoDataSourceImpl();
        const todoRepository = new todo_repository_impl_1.TodoRepositoryImpl(datasource);
        const todoController = new controllers_1.TodoController(todoRepository);
        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodo);
        router.post("/", todoController.createTodo);
        router.put("/:id", todoController.updateTodo);
        router.delete("/:id", todoController.deleteTodo);
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
