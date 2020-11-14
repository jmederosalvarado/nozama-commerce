import { NextApiRequest, NextApiResponse } from "next";
import { OfferPreview } from "../../../types/offers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferPreview[]>
) {
  const result = await prisma.offer.findMany({
    take: 3,
    orderBy: { rating: "desc" },
  });
  res.status(200).json(
    result.map((r) => ({
      id: String(r.id),
      name: r.product,
      price: r.price,
      rating: r.rating,
      image: r.image,
    }))
  );
}
