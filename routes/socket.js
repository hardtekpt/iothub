module.exports = {
  router: socket => {
    socket.on("message", msg => {
      console.log(msg);
    });
  }
};
