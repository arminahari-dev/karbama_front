import { up } from "up-fetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const upfetch = up(fetch, () => ({
  baseUrl: BASE_URL,
  credentials: "include" as RequestCredentials,
}));

export default upfetch;
