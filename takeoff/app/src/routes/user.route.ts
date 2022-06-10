import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";

import { Db } from "../../config/index";
import { NotificationAttrs } from "../../config/models/notification.model";

// Declaration merging
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}

interface blogParams {
  id: string;
}

const BlogRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get("/blogs", {}, async (request, reply) => {
    try {
      const { Notification } = server.db.models;

      const blogs = await Notification.find({});

      return reply.code(200).send(blogs);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });

  server.post<{ Body: NotificationAttrs }>(
    "/blogs",
    {},
    async (request, reply) => {
      try {
        const { Notification } = server.db.models;

        const blog = await Notification.addOne(request.body);
        await blog.save();
        return reply.code(201).send(blog);
      } catch (error) {
        request.log.error(error);
        return reply.send(500);
      }
    }
  );

  server.get<{ Params: blogParams }>(
    "/blogs/:id",
    {},
    async (request, reply) => {
      try {
        const ID = request.params.id;
        const { Notification } = server.db.models;
        const blog = await Notification.findById(ID);

        if (!blog) {
          return reply.send(404);
        }

        return reply.code(200).send(blog);
      } catch (error) {
        request.log.error(error);
        return reply.send(400);
      }
    }
  );
};

export default fp(BlogRoute);
