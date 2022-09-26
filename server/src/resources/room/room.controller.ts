import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpsException from "../../utils/exceptions/http.exception";
import RoomService from "./room.service";
import * as validate from "./room.validation";
import authenticatedMiddleware from "../../middleware/authenticated.middleware";
import validationMiddleware from "../../middleware/validation.middleware";

class RoomController implements Controller {
  public path = "/rooms";
  public router = Router();
  private RoomService = new RoomService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticatedMiddleware,
      validationMiddleware(validate.getRooms, "query"),
      this.getRooms
    );
    this.router.get(
      `${this.path}/messages`,
      authenticatedMiddleware,
      validationMiddleware(validate.getMessages, "query"),
      this.getMessages
    );
    this.router.get(
      `${this.path}/users`,
      authenticatedMiddleware,
      validationMiddleware(validate.getActiveUsers, "query"),
      this.getActiveUsers
    );
    this.router.post(
      `${this.path}/create`,
      authenticatedMiddleware,
      validationMiddleware(validate.createRoom),
      this.createRoom
    );
    this.router.delete(
      `${this.path}/`,
      authenticatedMiddleware,
      validationMiddleware(validate.deleteRoom),
      this.deleteRoom
    );
    this.router.post(
      `${this.path}/add`,
      authenticatedMiddleware,
      validationMiddleware(validate.addToRoom),
      this.addToRoom
    );
    this.router.post(
      `${this.path}/join`,
      authenticatedMiddleware,
      validationMiddleware(validate.joinRoom),
      this.joinRoom
    );
    this.router.post(
      `${this.path}/leave`,
      authenticatedMiddleware,
      validationMiddleware(validate.leaveRoom),
      this.leaveRoom
    );
  }
  private getRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { filter, limit } = req.query;
      const rooms = await this.RoomService.getRooms(
        String(filter || ""),
        Number(limit) || undefined
      );

      res.json({ message: "Success", rooms });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };
  private getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { roomName, limit } = req.query;

      const messages = await this.RoomService.getMessages(
        String(roomName),
        Number(limit) || undefined
      );

      res.json(messages);
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private getActiveUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { roomName } = req.query;

      const users = await this.RoomService.getActiveUsers(String(roomName));

      res.json(users);
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { roomName, description, roomPassword, isPrivate } = req.body;

      await this.RoomService.createRoom(
        req.user,
        roomName,
        description,
        roomPassword,
        isPrivate
      );

      res.status(201).json({ message: "Room successfully created." });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private deleteRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomName, roomPassword } = req.body;

      await this.RoomService.deleteRoom(req.user, roomName, roomPassword);

      res.status(200).json({ message: "Room successfully deleted." });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private addToRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomName, usernames } = req.body;

      const successfullyAdded = await this.RoomService.addToRoom(
        req.user,
        roomName,
        usernames
      );

      res.status(200).json({ successfullyAdded });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private joinRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomName, roomPassword } = req.body;
      const confirmation = await this.RoomService.joinRoom(
        req.user,
        roomName,
        roomPassword
      );

      res.json({ joinedSuccessfully: confirmation });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };

  private leaveRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { roomName } = req.body;

      const confirmation = await this.RoomService.leaveRoom(req.user, roomName);

      res.json({ leftSuccessfully: confirmation });
    } catch (e: any) {
      next(new HttpsException(400, e.message));
    }
  };
}

export default RoomController;
