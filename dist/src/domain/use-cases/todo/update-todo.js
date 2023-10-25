"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodo = void 0;
class UpdateTodo {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateTodo = UpdateTodo;
