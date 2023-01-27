import { Request, Response } from "express";
import { createNewSite, isSiteExists } from "../../models/site/site.model";

export const getSites = (req: Request, res: Response) => {};

export const postSite = async (req: Request, res: Response) => {
  const { name, url } = req.body;

  if (await isSiteExists(url)) {
    res.status(400).json({ message: "Site already exists" });
  } else {
    createNewSite({ name, url })
    .then((site) => {
      res.status(201).json(site);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  }

};

export const deleteSite = (req: Request, res: Response) => {};