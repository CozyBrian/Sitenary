import express from "express";
import sitesRouter from "./sites/sites.route";
import eventsRouter from "./events/events.route";
import usersRouter from "./users/users.route";
import authRouter from "./auth/auth.route";

const v1_api = express.Router();

v1_api.use('/sites', sitesRouter);
v1_api.use('/events', eventsRouter);
v1_api.use('/users', usersRouter);
v1_api.use('/auth', authRouter)

export default v1_api;