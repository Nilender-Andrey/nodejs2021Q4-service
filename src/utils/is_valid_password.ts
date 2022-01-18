import bcrypt from 'bcrypt';

const isValidPassword = (myPlaintextPassword: string, hash: string) =>
  bcrypt.compare(myPlaintextPassword, hash).then((result) => result);

export default isValidPassword;
