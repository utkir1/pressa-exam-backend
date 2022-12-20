import model from "./model.js";

import upload from "../../lib/multer.js";

import { InternalServerError, NotFoundError } from "../../lib/error.js";

const imagesUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);


const GET = async (req, res, next) => {
  try {
    const posts = await model.GET(req.params, req.query);
    if (posts.length == 0) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: posts,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};


const POSTIMAGE = async (req, res, next) => {
  try {
    const images = await model.POSTIMAGE(req.params, req.files);
    if (!images || images[0] == null) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "images added",
      data: images,
    });

  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default { GET, POSTIMAGE, imagesUpload };
