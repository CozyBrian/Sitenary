import { SITE_TYPE } from '../../types';
import Site from './site.mongo';

export const createNewSite = async (site: SITE_TYPE) => {
  try {
    const newSite = new Site(site);
    return await newSite.save();
  } catch (error) {
    console.error(error);
  }
};

export const isSiteExists = async (url: string) => {
  try {
    const isExists = await Site.exists({ url: url }) || await Site.exists({ _id: url });
    return isExists !== null;
  } catch (error) {
    console.error(error);
  }
}

export const getAllSites = async (userId: string) => {
  try {
    const sites = await Site.find({
      owner: userId
    }, { __v: 0, events: 0 });
    return sites;
  } catch (error) {
    console.error(error);
  }
}

export const deleteSiteByID = async (id: string) => {
  try {
    const site = await Site.findByIdAndDelete(id);
    return site;
  } catch (error) {
    console.error(error);
  }
}