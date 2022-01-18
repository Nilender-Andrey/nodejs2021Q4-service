import { RequestGenericInterface } from 'fastify';

export interface ILoginReqBody {
  login: string;
  password: string;
}

export interface IPostLoginReq extends RequestGenericInterface {
  body: ILoginReqBody;
}
