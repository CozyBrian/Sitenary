import axios from "axios";
import { BACKEND_URL } from "./constants";

export const getSites = () => axios.get(`${BACKEND_URL}/v1/sites`);

export const getSite = (id: string) =>
  axios.get(`${BACKEND_URL}/v1/sites/${id}`);

export const getSiteEvents = (id: string, period: string) =>
  axios.get(`${BACKEND_URL}/v1/events/${id}`, { params: { period } });
