require('colors');
const ExpressServer = require("./server/expressServer");
const config = require("../config/index");
const logger = require('./logger/winston.logger');
const connectDatabase = require('../database/database');

module.exports = async () => {
  const server = new ExpressServer();
  logger.info(`Express Server Loaded`);

  server.start();
  logger.info(`#####################################
        Server is listening on PORT: ${config.port}
      #####################################`.cyan);

   await connectDatabase();

};
