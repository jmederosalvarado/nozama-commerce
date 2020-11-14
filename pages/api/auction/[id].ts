import { NextApiRequest, NextApiResponse } from "next";
import { OfferDetails } from "../../../types/offers";
import {Auction, Offer, PrismaClient} from "@prisma/client"
import OfferCard from "../../../components/offers/offer-card";
import { AuctionDetails, AuctionPreview } from "../../../types/auctions";

const prisma = new PrismaClient()

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
  res: NextApiResponse<AuctionDetails>
) {
    if (req.method == 'GET')
    {
      const result = await getById(req)
      result == null ? res.status(401).end() :res.status(200).json({id: String(result.id)  ,name:result.product, description: result.productDescription, price:result.currentPrice ,bids:result.bids,closing:result.closing })
    }
    else if (req.method == 'DELETE')
    {
      const result = await deleteAuction(req)
      const auction = result as Auction
      if (result =='Error in deletion.')
      {
        res.status(401).end()
        return
      }
      result == null ? res.status(401).end() : res.status(200).json({id: String(auction.id),name: auction.product,description: auction.productDescription, price: auction.currentPrice, closing:result.closing,bids: result.bids})
    }
}  

async function getById(req:NextApiRequest) {
    //To get auction
    const { id } = req.query;
    const ID = parseInt(String(id))
    const result = await prisma.auction.findFirst({where:{id :ID}})
    return result
}

async function deleteAuction(
  req: NextApiRequest
  
) {
    //To delete, just id of auction is required
    const { id } = req.query;    
    const ID = parseInt(String(id))
    try 
    {
      const result = await prisma.auction.delete({where:{id:ID}})    
      return result
    } 
    catch(Error)
    {
    return 'Error in deletion.'
    }

  } 

