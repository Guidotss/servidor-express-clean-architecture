import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/mongo";
import { Category } from "@prisma/client";

describe("Todo route tests", () => {
  beforeAll(async () => {
    await testServer.start();
  });
  afterAll(async () => {
    await testServer.stop();
  });

  test("should return TODOS /api/todos", async () => {
    const response = await request(testServer.app)
      .get("/api/todos")
      .expect(200);
  });

  test("should return TODO /api/todos/:id", async () => {
    const todo1 = {
      title: "Todo test",
      description: "Description test",
      category: Category.Pending,
      completed: false,
    };
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      ok: true,
      todo,
    });
  });

  test("should return 404 TODO /api/todos/:id", async () => {
    const { body } = await request(testServer.app)
      .get(`/api/todos/6537dd82656ab35e9ccb6f33`)
      .expect(404);

    expect(body).toEqual({
      ok: false,
      error: "Todo with id 6537dd82656ab35e9ccb6f33 not found",
    });
  });

  test("should create TODO /api/todos", async () => {
    const todo1 = {
      title: "Todo test2",
      description: "Description test2",
      category: Category.Pending,
      completed: false,
    };
    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      ok: true,
      todo: expect.objectContaining(todo1),
    });
  });

  test("should update TODO /api/todos/:id", async () => {
    const todo1 = {
      title: "Todo test3",
      description: "Description test3",
      category: Category.Pending,
      completed: false,
    };
    const todo = await prisma.todo.create({ data: todo1 });
    const todo2 = {
      title: "Todo test4",
      description: "Description test4",
      category: Category.Pending,
      completed: false,
    };
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send(todo2)
      .expect(200);

    expect(body).toEqual({
      ok: true,
      todo: expect.objectContaining(todo2),
    });
  });

  test("should return 404 TODO /api/todos/:id", async () => {
    const { body } = await request(testServer.app)
      .put(`/api/todos/6537dd82656ab35e9ccb6f33`)
      .expect(404);

    expect(body).toEqual({
      ok: false,
      error: "Todo with id 6537dd82656ab35e9ccb6f33 not found",
    });
  });

  test("should delete TODO /api/todos/:id", async () => {
    const todo1 = {
      title: "Todo test5",
      description: "Description test5",
      category: Category.Pending,
      completed: false,
    };
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      ok: true,
      todo: expect.objectContaining(todo1),
    });
  });
});
