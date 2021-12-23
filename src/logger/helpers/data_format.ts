import { FastifyReply, FastifyRequest } from 'fastify';

const dataFormat = {
  res(res: FastifyReply) {
    return {
      statusCode: res.statusCode,
    };
  },
  req(req: FastifyRequest) {
    return {
      method: req.method,
      url: req.url,
      path: req.routerPath,
      parameters: req.params,
      query: req.query,
      headers: req.headers,
    };
  },
};

export default dataFormat;
