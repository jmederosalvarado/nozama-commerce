import { NextApiRequest, NextApiResponse } from "next";
import { OfferPreview } from "../../../../types/offers";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferPreview[]>
) {
  const offers: OfferPreview[] = [];
  for (let i = 0; i < 3; i++) {
    offers.push({
      id: `id-${i}`,
      name: "Product Name",
      price: 1000,
      rating: 4.5,
    });
  }

  res.status(200).json(offers);
}
