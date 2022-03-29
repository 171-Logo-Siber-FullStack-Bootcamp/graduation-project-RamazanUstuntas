const { createLogger, format, transports } = require('winston');

// server error-info logger
serverLogger = createLogger({
  transports:
      new transports.File({
      filename: 'app/logs/server.log',
      format:format.combine(
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}),
});
// user transaction logger
usersLogger = createLogger({
  transports:
      new transports.File({
      filename: 'app/logs/users.log',
      format:format.combine(
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}),
});

module.exports = {
  serverLogger,
  usersLogger,
}