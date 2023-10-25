import { Category } from "@prisma/client";

export class UpdateTodoDto {
  private constructor(
    public readonly id: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly completed?: boolean,
    public readonly category?: Category
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.title) returnObj.title = this.title;
    if (this.description) returnObj.description = this.description;
    if (this.completed) returnObj.done = this.completed;
    if (this.category) returnObj.category = this.category;

    return returnObj;
  }

  static update(props: {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
    category?: Category;
  }): [string?, UpdateTodoDto?] {
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
