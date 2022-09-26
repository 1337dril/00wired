import Joi from "joi";

export const createRoom = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(0).max(500),
  isPrivate: Joi.bool(),
  roomPassword: Joi.string().min(8).max(80),
});

export const deleteRoom = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
  roomPassword: Joi.string().min(8).max(80).required(),
});

export const addToRoom = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
  usernames: Joi.array().required(),
});

export const joinRoom = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
  roomPassword: Joi.string().min(8).max(80),
});

export const leaveRoom = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
});

export const getRooms = Joi.object({
  filter: Joi.string().max(50),
  limit: Joi.number(),
});

export const getMessages = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
  limit: Joi.number(),
});

export const getActiveUsers = Joi.object({
  roomName: Joi.string().min(3).max(50).required(),
});
