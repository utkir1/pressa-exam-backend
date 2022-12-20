import { fetch, fetchAll } from "../../lib/postgres.js";

import query from "./query.js";

const GET = async ({ adminId = 0 }) => {
  try {
    return await fetchAll(query.GET, adminId);
  } catch (error) {
    console.log(error);
  }
};

const POST = async ({ username, password, avatar = null }) => {
  try {
    return await fetch(query.POST, username, password, avatar);
  } catch (error) {
    console.log(error);
  }
};

const LOGIN = async ({ username, password }) => {
  try {
    return await fetch(query.LOGIN, username, password);
  } catch (error) {
    console.log(error);
  }
};

export default { GET, POST, LOGIN };
