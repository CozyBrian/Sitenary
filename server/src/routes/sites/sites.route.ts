import express from "express";
import { deleteSite, getSites, postSite } from "./sites.controller";

const sitesRouter = express.Router();

sitesRouter.get("/", getSites);
sitesRouter.post("/", postSite);
sitesRouter.delete("/:id", deleteSite);

export default sitesRouter;