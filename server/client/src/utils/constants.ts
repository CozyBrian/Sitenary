export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

export const urlRegex = new RegExp(
  "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
);
