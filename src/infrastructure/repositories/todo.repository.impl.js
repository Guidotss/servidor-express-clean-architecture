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
exports.TodoRepositoryImpl = void 0;
class TodoRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.datasource.create(createTodoDto);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.datasource.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.datasource.findById(id);
        });
    }
    update(updateTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.datasource.update(updateTodoDto);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.datasource.delete(id);
        });
    }
}
exports.TodoRepositoryImpl = TodoRepositoryImpl;
