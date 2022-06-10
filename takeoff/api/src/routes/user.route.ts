import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import { UserTaskData } from "../../../share/index";
import { Db } from "../../config/index";

// Declaration merging
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}

const generateAllNotifications = () => {};

const userRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post<{ Body: UserTaskData }>("/", {}, async (request, reply) => {
    try {
      return reply.code(201);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });
};

export default fp(userRoute);
