import jwt from 'jsonwebtoken';

const isValidToken = (token: string, privateKey: string) =>
  jwt.verify(token, privateKey);

export default isValidToken;
