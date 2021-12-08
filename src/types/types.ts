export interface IColumn {
  id: string;
  order: number;
  title: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserArgType = {
  name: string;
  login: string;
  password: string;
};

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: IColumn | null;
}
