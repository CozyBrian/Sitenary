import express from "express";
import sitesRouter from "./sites/sites.route";
import eventsRouter from "./events/events.route";
import { getIp } from "./events/events.controller";

const v1_api = express.Router();

v1_api.use('/sites', sitesRouter);
v1_api.use('/events', eventsRouter);
v1_api.get("/ip", getIp);

export default v1_api;