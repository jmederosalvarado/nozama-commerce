import { prismaVersion } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { AuctionDetails, AuctionPreview } from "../../../types/auctions";
import { OfferPreview } from "../../../types/offers";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuctionPreview[]>
) {
  
  const result = await prisma.auction.findMany({take:3,orderBy:{bids: 'desc'}})
  const topAuction:AuctionPreview[]=[]
  for(let i ; i < result.length; i++)
  {
    topAuction.push({
      id: String(result[i].id),
      name: result[i].product,
      price: result[i].currentPrice,
      bids : result[i].bids,    
      image: result[i].image  
    });

  }
  res.status(200).json(topAuction)
}
