export class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
    public readonly category: string
  ) {}

  get isDone() {
    return this.completed;
  }

  public static fromObject(obj: { [key: string]: any }): TodoEntity {
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
