import { NextApiRequest, NextApiResponse } from "next";
import { OfferPreview } from "../../../types/offers";
import { Auction, PrismaClient } from "@prisma/client";
import { AuctionPreview ,AuctionDetails} from "../../../types/auctions";

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
  res: NextApiResponse<AuctionDetails | AuctionPreview[]>
) {
  if (req.method == "GET") {
    const result = await getAllAuction(req);
    if (result == null) {
      res.status(401).end();
    } 
    else {
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

    }
   else if (req.method == "POST") {
    const result = await createAuction(req);
    const offer = result as Auction;
    if (result == "Error in creation") {
      res.status(401).end();
    }
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            id: String(offer.id),
            name: offer.product,
            image: offer.image,
            price: offer.currentPrice,
            bids: offer.bids,
            description: offer.productDescription,
            closing: offer.closing
          });
  }
}

async function getAllAuction(req: NextApiRequest) {
  //To get all auction

  const result = await prisma.auction.findMany();
  return result;
}

async function createAuction(req: NextApiRequest) {
  const {
    prod,
    prodDescription,
    idSeller,
    image,
    price,
    rating,
    closing,
  } = req.body;
  const pr = String(prod);
  const prD = String(prodDescription);
  const idS = String(idSeller);
  const im = String(image);
  const pric = parseInt(String(price));
  const rate = parseInt(String(rating));
  const closin = String(closing);

  try {
    const result = await prisma.auction.create({
      data: {
        product: pr,
        productDescription: prD,
        idSeller: idS,
        image: im,
        currentPrice: pric,
        rating: rate,
        closing: closin,
      },
    });
    return result;
    //res.status(200).json({id : id as string, name : pr, image:im,price: pric, rating: rate})
  } catch (Error) {
    return "Error in creation";
    //res.status(400).end()
  }
}
