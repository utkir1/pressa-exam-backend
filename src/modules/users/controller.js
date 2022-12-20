import jwt from "../../lib/jwt.js";

import model from "./model.js";

import { InternalServerError, AuthorizationError } from "../../lib/error.js";

const LOGIN = async (req, res, next) => {
  try {
    let user = await model.LOGIN(req.body);
    if (!user) return next(new AuthorizationError(401, "wrong username or password"));

    res.status(200).json({
      status: 200,
      message: "ok",
      token: jwt.sign({ userId: user.user_id }),
      data: user,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};


const REGISTER = async (req, res, next) => {
  try {
    let user = await model.REGISTER(req.body);
    if (!user) return next(new AuthorizationError(401, "wrong username or password"));

    res.status(200).json({
      status: 200,
      message: "ok",
      token: jwt.sign({ userId: user.user_id }),
      data: user,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default { LOGIN, REGISTER };
