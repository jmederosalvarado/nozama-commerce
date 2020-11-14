import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { UserPreview } from "../../../types/users";
import { SellerPreview } from "../../../types/sellers";
import { request } from "http";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellerPreview[]>
) {
  //To get all user
  if (req.method == "GET") {
    const result = await prisma.user.findMany();
    if (result == null) {
      res.status(401).end();
    } else {
      const user: SellerPreview[] = [];
      for (let i = 0; i < result.length; i++) {
        user.push({
          username: result[i].username,
          rating: result[i].rating,
          image: result[i].image,
        });
      }
      res.status(200).json(user);
    }
  }
}

async function getAllUser(req: NextApiRequest) {
  //To get all user

  const result = await prisma.user.findMany();
  return result;
}
