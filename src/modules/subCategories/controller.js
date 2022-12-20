import model from "./model.js";

import { InternalServerError, NotFoundError } from "../../lib/error.js";

const GET = async (req, res, next) => {
  try {
    const categories = await model.GET(req.params);

    if (categories.length == 0) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: categories,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = async (req, res, next) => {
  try {
    const category = await model.POST(req.body);

    if (!category) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: category,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const PUT = async (req, res, next) => {
  try {
    const category = await model.PUT(req.body);

    if (!category) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: category,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const DELETE = async (req, res, next) => {
  try {
    const category = await model.DELETE(req.body);

    if (!category) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: category,
    });
    
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default { GET, POST, PUT, DELETE };
