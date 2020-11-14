import { NextApiRequest, NextApiResponse } from "next";
import { AuctionPreview } from "../../../../types/auctions";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuctionPreview[]>
) {
  const auctions: AuctionPreview[] = [];
  for (let i = 0; i < 25; i++) {
    auctions.push({
      id: `id-${i}`,
      name: "Product Name",
      price: 1000,
      bids: 50,
    });
  }

  res.status(200).json(auctions);
}
