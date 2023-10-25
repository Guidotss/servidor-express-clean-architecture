"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
class CreateTodoDto {
    constructor(title, description, completed, category) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.category = category;
    }
    static create(props) {
        const { title, description, completed, category } = props;
        if (!title) {
            return ["Title is required"];
        }
        if (!description) {
            return ["Description is required"];
        }
        if (completed == undefined) {
            return ["Completed is required"];
        }
        if (!category) {
            return ["Category is required"];
        }
        return [
            undefined,
            new CreateTodoDto(title, description, completed, category),
        ];
    }
}
exports.CreateTodoDto = CreateTodoDto;
