import { GameItem } from "@/entities/gameItem";
import { Group } from "@/entities/group";
import { Level } from "@/entities/level";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Level, GameItem, Group],
  synchronize: false,
  logging: false,
});

export const connectDB = async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  };
