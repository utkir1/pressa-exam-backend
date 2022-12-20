import jwt from "../../lib/jwt.js";

import model from "./model.js";

import { InternalServerError, AuthorizationError, NotFoundError } from "../../lib/error.js";

const GET = async (req, res, next) => {
  try {
    let admins = await model.GET(req.params);
    if (admins.length === 0) return next(new NotFoundError(404, "client Error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      adminId: req.adminId,
      data: admins,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = async (req, res, next) => {
  try {
    let admin = await model.POST(req.body);
    if (!admin) return next(new AuthorizationError(401, "wrong username or password"));

    res.status(201).json({
      status: 201,
      message: "ok",
      token: jwt.sign({ adminId: admin.admin_id }),
      data: admin,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const LOGIN = async (req, res, next) => {
  try {
    let admin = await model.LOGIN(req.body);
    if (!admin) return next(new AuthorizationError(401, "wrong username or password"));

    res.status(200).json({
      status: 200,
      message: "ok",
      token: jwt.sign({ adminId: admin.admin_id }),
      data: admin,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default { GET, POST, LOGIN };
