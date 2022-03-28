module.exports = {
  HOST: "db-host",
  USER: "db-user",
  PASSWORD: "db-pass",
  DB: "db-name",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};