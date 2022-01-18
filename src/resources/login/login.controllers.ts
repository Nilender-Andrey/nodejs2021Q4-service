import { FastifyReply } from 'fastify';
import DataBaseError from '../../bd/database_error';
import User from '../users/user.model';
import { IPostLoginReq } from './login.type';

const postLogin = async (
  req: IPostLoginReq,
  res: FastifyReply,
): Promise<void> => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (user && user.password === password) {
      res.code(200).send(user).log.debug(`Returned JWT token`);
    } else {
      res
        .code(403)
        .send('User with the given username and password was not found')
        .log.debug(`User with the given username and password was not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { postLogin };
