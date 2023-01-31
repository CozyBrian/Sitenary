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

  const regex = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");

  if (await isSiteExists(url)) {
    res.status(400).json({ message: "Site already exists" });
  } else {
    if ((name === "" || name === undefined) || (url === "" || url === undefined)) {
      res.status(400).json({ message: "Missing Field is required" });
    } else {
      if (regex.test(url) === false) {
        res.status(400).json({ message: "Invalid URL" });
      } else {
        createNewSite({ name, url })
        .then((site) => {
          res.status(201).json(site);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      }
    }
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