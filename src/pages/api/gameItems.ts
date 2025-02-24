// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource, connectDB } from "./ormconfig";
import { GameItem } from "@/entities/gameItem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    const gameItems = await AppDataSource.getRepository(GameItem).find();
    return res.status(200).json(gameItems);
  }
}
