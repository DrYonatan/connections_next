import { GameItem } from "@/entities/gameItem";
import { Group } from "@/entities/group";
import { Level } from "@/entities/level";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt("5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Level, GameItem, Group],
  synchronize: false,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false, // Required for self-signed certs or Neon
    },
  },
});

export const connectDB = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
};
