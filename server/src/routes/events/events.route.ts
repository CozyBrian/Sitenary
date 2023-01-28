import express from "express";
import { getEvents, getIp, postEvent } from "./events.controller";

const eventsRouter = express.Router();

eventsRouter.get("/:id", getEvents);
eventsRouter.post("/:id", postEvent);

export default eventsRouter;