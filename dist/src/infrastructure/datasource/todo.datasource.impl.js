"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDataSourceImpl = void 0;
const mongo_1 = require("../../data/mongo");
const domain_1 = require("../../domain");
class TodoDataSourceImpl {
    create(createTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield mongo_1.prisma.todo.create({
                data: createTodoDto,
            });
            return domain_1.TodoEntity.fromObject(todo);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield mongo_1.prisma.todo.findMany();
                return todos.map((todo) => domain_1.TodoEntity.fromObject(todo));
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield mongo_1.prisma.todo.findUnique({
                where: { id },
            });
            if (!todo)
                throw new domain_1.CustomError(`Todo with id ${id} not found`, 404);
            return domain_1.TodoEntity.fromObject(todo);
        });
    }
    update(updateTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(updateTodoDto.id);
            const todo = yield mongo_1.prisma.todo.update({
                where: { id: updateTodoDto.id },
                data: {
                    title: updateTodoDto.title,
                    description: updateTodoDto.description,
                    completed: updateTodoDto.completed,
                    category: updateTodoDto.category,
                },
            });
            return domain_1.TodoEntity.fromObject(todo);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(id);
            const deleted = yield mongo_1.prisma.todo.delete({
                where: { id },
            });
            return domain_1.TodoEntity.fromObject(deleted);
        });
    }
}
exports.TodoDataSourceImpl = TodoDataSourceImpl;
