import { fetch, fetchAll } from "../../lib/postgres.js";

import query from "./query.js";

const LOGIN = async ({ username, password }) => {
  try {
    return await fetch(query.LOGIN, username, password);
  } catch (error) {
    console.log(error);

  }
};

const REGISTER = async ({ username, password }) => {
  try {
    return await fetch(query.REGISTER, username, password);
  } catch (error) {
    console.log(error);

  }
};

export default { LOGIN,REGISTER };
