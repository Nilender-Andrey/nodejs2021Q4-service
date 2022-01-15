import { RequestGenericInterface } from 'fastify';

export interface UserReqGet extends RequestGenericInterface {
  params: {
    userId: string;
  };
}
export interface UserReqAdd extends RequestGenericInterface {
  body: {
    name: string;
    login: string;
    password: string;
  };
}
export interface UserReqPut extends RequestGenericInterface {
  params: {
    userId: string;
  };
  body: {
    name?: string;
    login?: string;
    password?: string;
  };
}
export interface UserReqDelete extends RequestGenericInterface {
  params: {
    userId: string;
  };
}
