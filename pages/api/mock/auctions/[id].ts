import { NextApiRequest, NextApiResponse } from "next";
import { AuctionDetails } from "../../../../types/auctions";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuctionDetails>
) {
  res.status(200).json({
    id: `${req.query.id}`,
    name: "Product Name",
    description: "Some Product description",
    price: 1000,
    bids: 50,
    closing: "2020-11-12T13:00:00",
  });
}
