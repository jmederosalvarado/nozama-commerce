import { NextApiRequest, NextApiResponse } from "next";
import { SellerDetails } from "../../../../types/sellers";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellerDetails>
) {
  res.status(200).json({
    username: `${req.query.id}`,
    rating: 5,
  });
}
