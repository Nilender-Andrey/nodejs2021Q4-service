import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const getHashFromPassword = (password: string) =>
  bcrypt.hash(password, saltRounds).then((hash) => hash);

export default getHashFromPassword;
