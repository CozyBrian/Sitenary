import express from "express";
import WhichUser from "../../middlewares/jwt";
import { getEvents, postEvent } from "./events.controller";

const eventsRouter = express.Router();

eventsRouter.get("/:id", WhichUser ,getEvents);
eventsRouter.post("/:id", postEvent);

export default eventsRouter;