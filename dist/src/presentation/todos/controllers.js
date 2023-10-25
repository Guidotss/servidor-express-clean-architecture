"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const domain_1 = require("../../domain");
const create_todo_1 = require("../../domain/use-cases/todo/create-todo");
const delete_todo_1 = require("../../domain/use-cases/todo/delete-todo");
class TodoController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
        this.handleError = (err, res) => {
            if (err instanceof domain_1.CustomError) {
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
        this.getTodos = (_, res) => {
            new domain_1.GetTodos(this.todoRepository)
                .execute()
                .then((todos) => res
                .header("Content-Type", "application/json")
                .json({ ok: true, todos })
                .status(200))
                .catch((err) => this.handleError(err, res));
        };
        this.getTodo = (req, res) => {
            const id = req.params.id;
            new domain_1.GetTodo(this.todoRepository)
                .execute(id)
                .then((todo) => res
                .header("Content-Type", "application/json")
                .json({ ok: true, todo })
                .status(200))
                .catch((err) => this.handleError(err, res));
        };
        this.createTodo = (req, res) => {
            const [error, createTodoDto] = domain_1.CreateTodoDto.create(req.body);
            if (error)
                return res
                    .header("Content-Type", "application/json")
                    .status(400)
                    .json(error);
            new create_todo_1.CreateTodo(this.todoRepository)
                .execute(createTodoDto)
                .then((todo) => res
                .header("Content-Type", "application/json")
                .status(201)
                .json({ ok: true, todo }))
                .catch((err) => this.handleError(err, res));
        };
        this.updateTodo = (req, res) => {
            const id = req.params.id;
            const [error, updateTodoDto] = domain_1.UpdateTodoDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error) {
                return res
                    .header("Content-Type", "application/json")
                    .status(400)
                    .json(error);
            }
            new domain_1.UpdateTodo(this.todoRepository)
                .execute(updateTodoDto)
                .then((todo) => res
                .header("Content-Type", "application/json")
                .status(200)
                .json({ ok: true, todo }))
                .catch((err) => this.handleError(err, res));
        };
        this.deleteTodo = (req, res) => {
            const id = req.params.id;
            new delete_todo_1.DeleteTodo(this.todoRepository)
                .execute(id)
                .then((todo) => res
                .header("Content-Type", "application/json")
                .json({ ok: true, todo })
                .status(200))
                .catch((err) => this.handleError(err, res));
        };
    }
}
exports.TodoController = TodoController;
