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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const test_server_1 = require("../../test-server");
const mongo_1 = require("../../../src/data/mongo");
const client_1 = require("@prisma/client");
describe("Todo route tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_server_1.testServer.start();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_server_1.testServer.stop();
    }));
    test("should return TODOS /api/todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .get("/api/todos")
            .expect(200);
    }));
    test("should return TODO /api/todos/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const todo1 = {
            title: "Todo test",
            description: "Description test",
            category: client_1.Category.Pending,
            completed: false,
        };
        const todo = yield mongo_1.prisma.todo.create({ data: todo1 });
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);
        expect(body).toEqual({
            ok: true,
            todo,
        });
    }));
    test("should return 404 TODO /api/todos/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .get(`/api/todos/6537dd82656ab35e9ccb6f33`)
            .expect(404);
        expect(body).toEqual({
            ok: false,
            error: "Todo with id 6537dd82656ab35e9ccb6f33 not found",
        });
    }));
    test("should create TODO /api/todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const todo1 = {
            title: "Todo test2",
            description: "Description test2",
            category: client_1.Category.Pending,
            completed: false,
        };
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .post(`/api/todos`)
            .send(todo1)
            .expect(201);
        expect(body).toEqual({
            ok: true,
            todo: expect.objectContaining(todo1),
        });
    }));
    test("should update TODO /api/todos/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const todo1 = {
            title: "Todo test3",
            description: "Description test3",
            category: client_1.Category.Pending,
            completed: false,
        };
        const todo = yield mongo_1.prisma.todo.create({ data: todo1 });
        const todo2 = {
            title: "Todo test4",
            description: "Description test4",
            category: client_1.Category.Pending,
            completed: false,
        };
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send(todo2)
            .expect(200);
        expect(body).toEqual({
            ok: true,
            todo: expect.objectContaining(todo2),
        });
    }));
    test("should return 404 TODO /api/todos/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .put(`/api/todos/6537dd82656ab35e9ccb6f33`)
            .expect(404);
        expect(body).toEqual({
            ok: false,
            error: "Todo with id 6537dd82656ab35e9ccb6f33 not found",
        });
    }));
    test("should delete TODO /api/todos/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const todo1 = {
            title: "Todo test5",
            description: "Description test5",
            category: client_1.Category.Pending,
            completed: false,
        };
        const todo = yield mongo_1.prisma.todo.create({ data: todo1 });
        const { body } = yield (0, supertest_1.default)(test_server_1.testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);
        expect(body).toEqual({
            ok: true,
            todo: expect.objectContaining(todo1),
        });
    }));
});
