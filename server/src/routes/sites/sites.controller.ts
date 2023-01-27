import { Request, Response } from "express";
import { createNewSite, deleteSiteByID, getAllSites, isSiteExists } from "../../models/site/site.model";

export const getSites = (req: Request, res: Response) => {
  getAllSites().then((sites) => {
    res.status(200).send(sites);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
};

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

export const deleteSite = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (await isSiteExists(id)) {
    deleteSiteByID(id).then((site) => {
      res.status(200).json({ message: "Site deleted", site });
    }).catch((err) => {
      res.status(500).send(err);
    });
  } else {
    res.status(404).json({ message: "Site not found" });
  }
};