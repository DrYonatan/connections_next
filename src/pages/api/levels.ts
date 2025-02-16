// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource, connectDB } from "../../../../ormconfig";
import { Level } from "@/entities/level";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    const levels = await AppDataSource.getRepository(Level).find();
    return res.status(200).json(levels);
  }
}
