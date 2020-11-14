import { NextApiRequest, NextApiResponse } from "next";
import { OfferDetails } from "../../../types/offers";
import { Offer, PrismaClient } from "@prisma/client";
import OfferCard from "../../../components/offers/offer-card";

const prisma = new PrismaClient();

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<OfferDetails>
// ) {
//   res.status(200).json({
//     id: `${req.query.id}`,
//     name: "Product Name",
//     description: "Some Product description",
//     price: 1000,
//     rating: 4.5,
//   });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferDetails>
) {
  if (req.method == "GET") {
    const result = await getById(req);
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            id: String(result.id),
            name: result.product,
            description: result.productDescription,
            price: result.price,
            rating: result.rating,
          });
  } else if (req.method == "DELETE") {
    const result = await deleteOffer(req);
    const offer = result as Offer;
    if (result == "Error in deletion.") {
      res.status(401).end();
      return;
    }
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            id: String(offer.id),
            name: offer.product,
            description: offer.productDescription,
            price: offer.price,
            rating: offer.rating,
          });
  } else if (req.method == "PUT") {
    const offer = await updateOffer(req);
    offer == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            id: String(offer.id),
            name: offer.product,
            description: offer.productDescription,
            price: offer.price,
            rating: offer.rating,
          });
  }
}

async function getById(req: NextApiRequest) {
  //To get offer
  const { id } = req.query;
  const ID = parseInt(String(id));
  const result = await prisma.offer.findFirst({ where: { id: ID } });
  return result;
}

async function deleteOffer(req: NextApiRequest) {
  //To delete, just id of offer is required
  const { id } = req.query;
  const ID = parseInt(String(id));
  try {
    const result = await prisma.offer.delete({ where: { id: ID } });
    return result;
  } catch (Error) {
    return "Error in deletion.";
  }
}

async function updateOffer(req: NextApiRequest) {
  const { id, product, productDescription, price } = req.body;

  const ID = parseInt(String(id));
  const prod = String(product);
  const prodD = String(productDescription);
  const pric = parseInt(String(price));

  const result = await prisma.offer.update({
    where: { id: ID },
    data: { product: prod, productDescription: prodD, price: pric },
  });
  return result;
}
