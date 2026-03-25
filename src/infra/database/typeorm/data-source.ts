import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { UserORM } from "./entities/user.entityORM";
import { RefreshTokenORM } from "../typeorm/entities/RefreshTokenORM";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [UserORM, RefreshTokenORM],
  synchronize: true, 
  logging: false,
});