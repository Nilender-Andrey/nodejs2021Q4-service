import { v4 as uuidv4 } from 'uuid';
import { IUser, UserArgType } from '../../types/types';

/** The class to create a user instance */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * to create a user, the constructor takes:
   * @param name - user name {string}
   * @param login - user's login {string}
   * @param password - user password {string}
   * @returns user object {object}
   */

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
