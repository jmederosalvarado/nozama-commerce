import { NextApiRequest, NextApiResponse } from "next";
import {Auction, PrismaClient, User} from "@prisma/client"
import { request } from "http";
import { AuctionDetails, AuctionPreview } from "../../../types/auctions";

 const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuctionPreview>
) {
    
 

   if (req.method == 'POST')
   {
    const result = await postBid(req)
    const user = result as Auction
    
    if(result == 'Error in bid creation.' || result =='Error, bid must higher than the current one.')
    {
      res.status(401).end();
      return
    }
    result == null ? res.status(401).end() : res.status(200).json({name:result.product,id:String(result.id), image: result.image,price:result.currentPrice,bids: result.bids})

   }
  }

  
async function postBid(
  req: NextApiRequest  
) {
  //To register, it is required name  username, email, password
  const {bidder,price} = req.body;
  const {id} = req.query
  
  
  const ID = parseInt(String(id))  
  const username = (String(bidder))  
  const pric = parseInt(String(price))  

  try 
  {
    const auction = await prisma.auction.findFirst({where:{id:ID}})
    if(auction.currentPrice >= pric )
    {
        return 'Error, bid must higher than the current one.'
    }
    const update = await prisma.auction.update({where:{id:ID}, data:{currentPrice:pric,idBidder:username}})
    const update2 = await prisma.auction.update({where:{id:ID}, data:{bids: update.bids+1}})
    return update2

  } 
  catch(Error)
  {
  return 'Error in bid creation.'
  }

}
