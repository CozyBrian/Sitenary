import axios from "axios";
import { BACKEND_URL } from "./constants";

const token = localStorage.getItem("accessToken");

export const getSites = () =>
  axios
    .get(`${BACKEND_URL}/v1/sites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const getSite = (id: string) =>
  axios.get(`${BACKEND_URL}/v1/sites/${id}`).then((res) => res.data);

export const getSiteEvents = (id: string, period: string) =>
  axios
    .get(`${BACKEND_URL}/v1/events/${id}`, {
      params: { period },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const postSite = (site: { name: string; url: string }) =>
  axios
    .post(`${BACKEND_URL}/v1/sites`, site, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const deleteSite = (id: string) =>
  axios
    .delete(`${BACKEND_URL}/v1/sites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
