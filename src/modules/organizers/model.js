import { fetch, fetchAll } from "../../lib/postgres.js";

import query from "./query.js";

const GET = async () => {
  try {
    let organizers = await fetchAll(query.GET);

    return organizers;
  } catch (error) {
    console.log(error);

  }
};

export default { GET };
