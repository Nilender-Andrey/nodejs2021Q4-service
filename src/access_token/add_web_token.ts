import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY || 'Secret';

const addToken = (userId: string, login: string) =>
  jwt.sign({ userId, login }, privateKey, { algorithm: 'HS256' });

export default addToken;
