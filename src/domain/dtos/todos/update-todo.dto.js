"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, title, description, completed, category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.category = category;
    }
    get values() {
        const returnObj = {};
        if (this.title)
            returnObj.title = this.title;
        if (this.description)
            returnObj.description = this.description;
        if (this.completed)
            returnObj.done = this.completed;
        if (this.category)
            returnObj.category = this.category;
        return returnObj;
    }
    static update(props) {
        const { id, title, description, completed, category } = props;
        if (!title && !description && completed == undefined && !category) {
            return ["Nothing to update"];
        }
        return [
            undefined,
            new UpdateTodoDto(id, title, description, completed, category),
        ];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
