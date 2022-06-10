import fastify from "fastify";
import { UserTaskData } from "../../share";
import db from "../config/index";

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/club";
const server = fastify({
  logger: true,
});

server.register(db, { uri });

server.get("/", async (req, res) => {
  res.send("hello");
});

server.post<{
  Body: UserTaskData;
  Reply: {
    success: boolean;
  };
}>("/", async (request, reply) => {
  const { uid, scheduledDate, timeZone } = request.body;
  console.log(
    `Task for user ${uid} scheduled for ${new Date(
      scheduledDate
    ).toLocaleString("en-US", {
      timeZone,
    })}, ${timeZone} time, received at ${new Date().toLocaleString("en-US")}`
  );
  reply.send({
    success: true,
  });
});

(async () => {
  try {
    await server.listen(port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
