import { NextApiRequest, NextApiResponse } from "next";
import { SellerPreview } from "../../../../types/sellers";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellerPreview[]>
) {
  const sellers: SellerPreview[] = [];
  for (let i = 0; i < 3; i++) {
    sellers.push({
      id: `id-${i}`,
      name: "Jorge Mederos",
      rating: 4.5,
    });
  }

  res.status(200).json(sellers);
}
