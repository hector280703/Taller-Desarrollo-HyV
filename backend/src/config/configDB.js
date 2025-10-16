"use strict";
const { DataSource } = require("typeorm");
const UserSchema = require("../entity/user.entity");

let AppDataSource = null;

function getAppDataSource() {
  if (!AppDataSource) {
    const { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } = require("./configEnv");
    
    AppDataSource = new DataSource({
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
  }
  return AppDataSource;
}

async function connectDB() {
  try {
    const ds = getAppDataSource();
    await ds.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

module.exports = { getAppDataSource, connectDB };