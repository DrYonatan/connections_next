// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource, connectDB } from "./ormconfig";
import { Level } from "@/entities/level";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    if (req.method === "GET") {

      const { date } = req.query;
  
      if (date) {
        const level = await AppDataSource.getRepository(Level).findOne({
          where: { date: new Date(date as string) },
        });
        if (!level) return res.status(404).json({ message: "Level not found" });
        return res.status(200).json(level);
      }
  
      const levels = await AppDataSource.getRepository(Level).find();
      return res.status(200).json(levels);
    }
  } catch (error) {
    console.log(error);
  }
  
}

