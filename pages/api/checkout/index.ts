import { NextApiRequest, NextApiResponse } from "next";
import {
  Auction,
  PrismaClient,
  User,
  Offer,
  BankAccount,
} from "@prisma/client";

import { request } from "http";
import { AuctionDetails, AuctionPreview } from "../../../types/auctions";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const result = await postCheckout(req);
    const bk = result as BankAccount;
    if (
      result == "Error account number not found." ||
      result == "Error, insufficient balance for purchase"
    ) {
      res.status(401).end();
      return;
    }
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({ bankaccountnumber: bk.number, balance: bk.balance });
  }
}

async function postCheckout(req: NextApiRequest) {
  const { offers, bankaccount } = req.body;
  const offs = offers as string[];
  var pric = 0;
  const bkacct = parseInt(String(bankaccount));
  for (let i = 0; i < offs.length; i++) {
    const off = await prisma.offer.findFirst({where:{id: parseInt(offs[i])}})
    pric += off.price;;
  }

  try {
    var account = await prisma.bankAccount.findFirst({
      where: { number: bkacct },
    });
    if (account.balance >= pric) {
      var account_paid = await prisma.bankAccount.update({
        where: { number: bkacct },
        data: { balance: account.balance - pric },
      });
      return account_paid;
    }
    return "Error, insufficient balance for purchase";
  } catch (Error) {
    return "Error account number not found.";
  }
}
