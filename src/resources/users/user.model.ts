import { v4 as uuidv4 } from 'uuid';
import { IUser, UserArgType } from '../../types/types';

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ name, login, password }: UserArgType) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
