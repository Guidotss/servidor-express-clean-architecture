"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
class TodoEntity {
    constructor(id, title, description, completed, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.category = category;
    }
    get isDone() {
        return this.completed;
    }
    static fromObject(obj) {
        const { id, title, description, completed, category } = obj;
        if (!id) {
            throw new Error("Id is required");
        }
        if (!title) {
            throw new Error("Title is required");
        }
        if (!description) {
            throw new Error("Description is required");
        }
        if (completed == undefined) {
            throw new Error("Completed is required");
        }
        if (!category) {
            throw new Error("Category is required");
        }
        return new TodoEntity(id, title, description, completed, category);
    }
}
exports.TodoEntity = TodoEntity;
