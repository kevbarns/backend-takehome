import fastify from "fastify";
import db from "../config/index";
import userRoute from "./routes/user.route";

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/club";

const server = fastify({
  logger: true,
});

server.register(db, { uri });
server.register(userRoute, { prefix: "/user" });

server.get("/", async (req, res) => {
  res.send("hello");
});

(async () => {
  try {
    await server.listen(port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
