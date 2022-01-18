import User from '../resources/users/user.model';
import getHashFromPassword from './get_hash_from_password';
import DataBaseError from '../bd/database_error';

const addFirstUser = async () => {
  try {
    const admin = await User.findOne({ login: 'admin' });

    if (!admin) {
      const hash = await getHashFromPassword('admin');
      const newUser = new User('admin', 'admin', hash);

      await User.save(newUser);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export default addFirstUser;
