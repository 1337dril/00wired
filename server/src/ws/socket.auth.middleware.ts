import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import User from "../resources/user/user.model";
import Token from "../utils/interfaces/token.interface";
import { verifyToken } from "../utils/token";

type SocketNext = (err?: ExtendedError | undefined) => void;

export default async function SocketAuthMiddleware(
  socket: Socket,
  next: SocketNext
) {
  const accessToken = socket.handshake.auth.token;
  try {
    const payload: Token | jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new Error("Not authenticated."));
    }

    const user = await User.findById(payload.id).select("-password").exec();

    if (!user) {
      return next(new Error("Not authenticated."));
    }

    socket.data.user = user;
    return next();
  } catch (e) {
    return next(new Error("Not authenticated."));
  }
}
