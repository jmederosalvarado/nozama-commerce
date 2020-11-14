import { NextApiRequest, NextApiResponse } from "next";
import { OfferDetails, OfferPreview } from "../../../types/offers";
import { Offer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// check req.query
// possible query params are `search` and `seller`

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<OfferPreview | OfferPreview[]>
// ) {
//   const offers: OfferPreview[] = [];
//   for (let i = 0; i < 25; i++) {
//     offers.push({
//       id: `id-${i}`,
//       name: "Product Name",
//       price: 1000,
//       rating: 4.5,
//     });
//   }

//   res.status(200).json(offers);
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferDetails | OfferPreview[]>
) {
  if (req.method == "GET") {
    const result = await getAllOffer(req);
    if (result == null) {
      res.status(401).end();
    } else {
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
  } else if (req.method == "POST") {
    const result = await createOffer(req);
    const offer = result as Offer;
    if (result == "Error in creation") {
      res.status(401).end();
    }
    result == null
      ? res.status(401).end()
      : res.status(200).json({
          id: String(offer.id),
          name: offer.product,
          image: offer.image,
          price: offer.price,
          rating: offer.rating,
          description: offer.productDescription,
        });
  }
}

async function getAllOffer(req: NextApiRequest) {
  //To get all offer

  const result = await prisma.offer.findMany();
  return result;
}

async function createOffer(req: NextApiRequest) {
  const {
    name: prod,
    description: prodDescription,
    seller: idSeller,
    image,
    price,
  } = req.body;
  const pr = String(prod);
  const prD = String(prodDescription);
  const idS = String(idSeller);
  const im = String(image);
  const pric = parseInt(String(price));
  const rate = 5;

  try {
    const result = await prisma.offer.create({
      data: {
        product: pr,
        productDescription: prD,
        idSeller: idS,
        image: im,
        price: pric,
        rating: rate,
      },
    });
    return result;
    //res.status(200).json({id : id as string, name : pr, image:im,price: pric, rating: rate})
  } catch (Error) {
    return "Error in creation";
    //res.status(400).end()
  }
}
