import { fetch, fetchAll } from "../../lib/postgres.js";

import query from "./query.js";

const GET = async () => {
  try {
    let categories = await fetchAll(query.GET);
    categories = categories.map((category) => {
      if (category.sub_categories[0] == null && category.sub_categories.length == 1) {
        category.sub_categories = [];
      }

      category.sub_categories.map((sub_category) => {
        delete sub_category.category_id;
        return sub_category;
      });

      return category;
    });

    return categories;
  } catch (error) {
    console.log(error);
  }
};

const POST = async ({ categoryName }) => {
  try {
    let checkName = await fetch(query.CHECK, categoryName);

    if (checkName) {
      return await fetch(query.POSTDELETED, checkName.category_id);
    }

    let categories = await fetch(query.POST, categoryName);

    return categories;
  } catch (error) {
    console.log(error);

  }
};


const PUT = async ({ categoryId, categoryName }) => {
  try {
    let categories = await fetch(query.PUT, categoryId, categoryName);

    return categories;
  } catch (error) {
    console.log(error);

  }
};


const DELETE = async ({ categoryId }) => {
  try {
    let categories = await fetch(query.DELETE, categoryId);

    return categories;
  } catch (error) {
    console.log(error);

  }
};

export default { GET, POST, PUT, DELETE };
