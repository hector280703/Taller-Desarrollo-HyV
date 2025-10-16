"use strict";
const { DataSource } = require("typeorm");
const { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } = require("./configEnv");
const UserSchema = require("../entity/user.entity");

const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: DB_PORT || 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [UserSchema],
  synchronize: true,
  logging: false,
});

async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

module.exports = { AppDataSource, connectDB };