import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

/** The class to create a user instance */
@Entity()
class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  login: string;

  @Column({
    length: 50,
  })
  password: string;

  /**
   * to create a user, the constructor takes:
   * @param name - user name
   * @param login - user's login
   * @param password - user password
   * @returns user object
   */

  constructor(name: string, login: string, password: string) {
    super();
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
