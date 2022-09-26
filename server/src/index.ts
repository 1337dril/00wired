import "dotenv/config";
import validateEnv from "./utils/validateEnv";
validateEnv();
import { createServer } from "http";
import App from "./app";
import mongoose from "mongoose";
import UserController from "./resources/user/user.controller";
import RoomController from "./resources/room/room.controller";
import { Server, Socket } from "socket.io";
import socketAuthMiddleware from "./ws/socket.auth.middleware";
import chatHandler from "./ws/chatHandler";
import { EventsMap } from "socket.io/dist/typed-events";
import User from "./resources/user/user.interface";

// api init
const app = new App(
  [new UserController(), new RoomController()],
  Number(process.env.PORT)
);
export const httpServer = createServer(app.express);

// socket init
const io = new Server<EventsMap, EventsMap, EventsMap, { user: User }>(
  httpServer,
  {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
      origin: "*",
    },
  }
);

function onConnection(socket: Socket) {
  chatHandler(io, socket);
}
io.use(socketAuthMiddleware);
io.on("connection", onConnection);

// server listen
httpServer.listen(app.port, () => {
  console.log("App listening on port " + app.port);
});

// handle exit sigs

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

async function gracefulShutdown(
  signal: typeof signals[number],
  server: Awaited<ReturnType<typeof createServer>>
) {
  console.log(`Got signal ${signal}. Shutting down...`);

  server.close();
  await mongoose.connection.close();
  process.exit(0);
}

for (let i = 0; i < signals.length; i++) {
  process.on(signals[i], () => gracefulShutdown(signals[i], httpServer));
}
