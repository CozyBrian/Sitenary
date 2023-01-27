import { SITE_TYPE } from '../../types';
import Site from './site.mongo';

export const createNewSite = async (site: SITE_TYPE) => {
  const newSite = new Site(site);
  return await newSite.save();
};

export const isSiteExists = async (url: string) => {
  const isExists = await Site.exists({ url: url });
  return isExists !== null;
}

