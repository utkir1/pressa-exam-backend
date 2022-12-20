import { Server } from "socket.io";

import { HOST } from "../config.js";

import jwt from "../lib/jwt.js";

export default (server) => {
  const io = new Server(server);

  io.on("connection", (client) => {
    client.on("new post", ({ token, message }) => {
      let { userId } = jwt.verify(token);

      message.post.post_images = message.post.post_images.map((image) => {
        if (!image.includes(HOST)) return HOST + "/" + image;
        else return image;

      });
      client.broadcast.emit("send post", { data: message });
    });

    client.on("accept post", ({ token, message }) => {
      let { adminId } = jwt.verify(token);

      message.post.post_images = message.post.post_images.map((image) => {
        if (!image.includes(HOST)) return HOST + "/" + image;
        else return image;

      });
      client.broadcast.emit("render post", { data: message });
    });

    client.on("disabled post", ({ token, message }) => {
      let { adminId } = jwt.verify(token);

      message.post.post_images = message.post.post_images.map((image) => {
        if (!image.includes(HOST)) return HOST + "/" + image;
        else return image;
        
      });
      client.broadcast.emit("delete post", { data: message });
    });
  });
};
