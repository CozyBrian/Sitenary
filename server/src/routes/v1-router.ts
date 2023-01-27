import express from "express";
import sitesRouter from "./sites/sites.route";
import eventsRouter from "./events/events.route";

const v1_api = express.Router();

v1_api.use('/sites', sitesRouter);
v1_api.use('/events', eventsRouter);

export default v1_api;