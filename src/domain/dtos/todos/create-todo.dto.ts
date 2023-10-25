import { Category } from "@prisma/client";

export class CreateTodoDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
    public readonly category: Category
  ) {}

  static create(props: {
    title: string;
    description: string;
    completed: boolean;
    category: Category;
  }): [string?, CreateTodoDto?] {
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
