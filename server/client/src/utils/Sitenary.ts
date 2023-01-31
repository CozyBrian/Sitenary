import axios from "axios";
import { BACKEND_URL } from "./constants";

export const getSites = () =>
  axios.get(`${BACKEND_URL}/v1/sites`).then((res) => res.data);

export const getSite = (id: string) =>
  axios.get(`${BACKEND_URL}/v1/sites/${id}`).then((res) => res.data);

export const getSiteEvents = (id: string, period: string) =>
  axios
    .get(`${BACKEND_URL}/v1/events/${id}`, { params: { period } })
    .then((res) => res.data);

export const postSite = (site: { name: string; url: string }) =>
  axios.post(`${BACKEND_URL}/v1/sites`, site).then((res) => res.data);
