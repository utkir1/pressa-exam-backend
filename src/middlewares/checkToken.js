
import { ForbiddenError } from "../lib/error.js";

import jwt from "../lib/jwt.js";

export default (req, res, next) => {

  try {
    if (req.url == "/login" || req.url == "/register") return next();

    let { token } = req.headers;

    if (!token) {
      return next(new ForbiddenError(403, "token required"));
    }

    let { userId, adminId } = jwt.verify(token);

    if (req.url == "/conferences/status/:conferenceId" || req.url.includes("admins")) {
      if (!adminId) return next(new ForbiddenError(403, "only admin can do this"));

      req.adminId = adminId;
    }

    req.userId = userId;

    return next();
    
  } catch (error) {
    return next(new ForbiddenError(403, error.message));
  }
};
