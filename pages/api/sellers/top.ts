import { NextApiRequest, NextApiResponse } from "next";
import { OfferPreview } from "../../../types/offers";
import { PrismaClient } from "@prisma/client";
import {SellerPreview} from "../../../types/sellers"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellerPreview[]>
) {
  const result = await prisma.user.findMany({
    take: 3,
    orderBy: { rating: "desc" },
  });
  res.status(200).json(
    result.map((r) => ({
      username: String(r.username),
      name: '',      
      rating: r.rating,
      image: r.image,
    }))
  );
}
