//const todoController = require("../controllers/device.controller");

module.exports = {
  router: socket => {
    socket.on("message", msg => {
      //todoController.testfunction(msg);
    });
  }
};
