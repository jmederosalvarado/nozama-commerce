import { PrismaClient } from "@prisma/client";
import faker from "faker";
import { NextApiRequest, NextApiResponse } from "next";
import { products, users } from "./images.json";

const prisma = new PrismaClient();
//var item = items[Math.floor(Math.random() * items.length)];
export default async function populate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.bankAccount.create({
    data: {
      number: 1000,
      balance: 15400,
    },
  });
  await prisma.bankAccount.create({
    data: {
      number: 2000,
      balance: 8000,
    },
  });
  await prisma.bankAccount.create({
    data: {
      number: 3000,
      balance: 10000,
    },
  });
  await prisma.bankAccount.create({
    data: {
      number: 4000,
      balance: 5000,
    },
  });

  //cambiado pa que solo haga 10 iteraciones
  for (let i = 0; i < 10; i++) {
    var user1 = faker.internet.userName();
    // var ima1 = faker.image.dataUri(400, 400);
    var ima1 = users[Math.floor(Math.random() * users.length)];
    var pass1 = faker.internet.password();
    var rat1 = faker.random.number({ min: 1, max: 5 });

    var user2 = faker.internet.userName();
    // var ima2 = faker.image.dataUri(400, 400);
    var ima2 = users[Math.floor(Math.random() * users.length)];
    var pass2 = faker.internet.password();
    var rat2 = faker.random.number({ min: 1, max: 5 });

    var bank1 = faker.finance.creditCardNumber();
    var bala1 = faker.random.number({ min: 0, max: 500000 });
    var bank2 = faker.finance.creditCardNumber();
    var bala2 = faker.random.number({ min: 0, max: 500000 });

    var date = new Date(Date.now());
    date.setHours(date.getHours() + rat1);
    var almostDate = date.toISOString();

    // var ima3 = faker.image.dataUri(400, 400);
    var ima3 = products[Math.floor(Math.random() * products.length)];
    var prod = faker.commerce.productName();
    var prodDescrition = faker.commerce.productDescription();
    var bids = faker.random.number({ min: 1, max: 15 });
    var rat3 = faker.random.number({ min: 1, max: 5 });
    var currPr = faker.random.number({ min: 10, max: 1000 });
    try {
      await prisma.user.create({
        data: { username: user1, password: pass1, image: ima1, rating: rat1 },
      });
      await prisma.user.create({
        data: { username: user2, password: pass2, image: ima2, rating: rat2 },
      });

      if (i % 2 == 0) {
        await prisma.offer.create({
          data: {
            product: prod,
            productDescription: prodDescrition,
            idSeller: user1,
            price: currPr,
            rating: rat3,
            image: ima3,
          },
        });
      } else {
        await prisma.auction.create({
          data: {
            product: prod,
            productDescription: prodDescrition,
            idSeller: user1,
            currentPrice: currPr,
            idBidder: user2,
            bids: bids,
            closing: almostDate,
            rating: rat3,
            image: ima3,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).end("database populated");
}
