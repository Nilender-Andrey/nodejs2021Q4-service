import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/types';

/** The class to create a user instance */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * to create a user, the constructor takes:
   * @param name - user name
   * @param login - user's login
   * @param password - user password
   * @returns user object
   */

  constructor(name: string, login: string, password: string) {
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
