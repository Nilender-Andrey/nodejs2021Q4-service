import { FastifyReply } from 'fastify';
import DataBaseError from '../../bd/database_error';
import addToken from '../../access_token/add_web_token';
import isValidPassword from '../../utils/is_valid_password';
import User from '../users/user.model';
import { IPostLoginReq } from './login.type';

const postLogin = async (
  req: IPostLoginReq,
  res: FastifyReply,
): Promise<void> => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (user) {
      const passwordCheckResult = await isValidPassword(
        password,
        user.password,
      );

      if (passwordCheckResult) {
        const token = addToken(user.id, user.login);

        res.code(200).send({ token }).log.debug(`Returned JWT token`);
      } else {
        res
          .code(403)
          .send('User with the given username and password was not found')
          .log.debug(`User with the given username and password was not found`);
      }
    } else {
      res
        .code(403)
        .send('User with this login was not found')
        .log.debug(`User with this login was not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { postLogin };
