import { prismaVersion } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AuctionDetails, AuctionPreview } from "../../../types/auctions";
import { OfferPreview } from "../../../types/offers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuctionPreview[]>
) {
  const result = await prisma.auction.findMany({
    take: 3,
    orderBy: { bids: "desc" },
  });
  res.status(200).json(
    result.map((r) => ({
      id: String(r.id),
      name: r.product,
      price: r.currentPrice,
      bids: r.bids,
      image: r.image,
    }))
  );
}
