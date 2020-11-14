import { NextApiRequest, NextApiResponse } from "next";
import { OfferDetails } from "../../../../types/offers";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferDetails>
) {
  res.status(200).json({
    id: `${req.query.id}`,
    name: "Product Name",
    description: "Some Product description",
    price: 1000,
    rating: 4.5,
  });
}
