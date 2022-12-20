
import { loginScheme, registerScheme } from "../lib/validations.js";

import { ValidationError } from "../lib/error.js";

export default (req, res, next) => {
  try {
    if (req.url == "/login") {
      let { error } = loginScheme.validate(req.body);
      if (error) throw error;
    }

    if (req.url == "/register") {
      let { error } = registerScheme.validate(req.body);
      if (error) throw error;
    }

    return next();

  } catch (error) {
    return next(new ValidationError(401, error.message));
  }
};
