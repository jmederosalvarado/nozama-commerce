import { NextApiRequest, NextApiResponse } from "next";
import { OfferPreview } from "../../../types/offers";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfferPreview[]>
) {
  
  const result = await prisma.offer.findMany({take:3,orderBy:{rating: 'desc'}})
  const topOffer:OfferPreview[]=[]
  for(let i ; i < result.length; i++)
  {
    topOffer.push({
      id: String(result[i].id),
      name: result[i].product,
      price: result[i].price,
      rating : result[i].rating,
      image: result[i].image      
    });

  }
  res.status(200).json(topOffer)
}
