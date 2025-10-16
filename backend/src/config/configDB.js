import { DataSource } from "typeorm";
import UserSchema from "../entity/user.entity.js";
import configEnv from "./configEnv.js";

let AppDataSource = null;

export function getAppDataSource() {
  if (!AppDataSource) {
    const { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } = configEnv;
    
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

export async function connectDB() {
  try {
    const ds = getAppDataSource();
    await ds.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}