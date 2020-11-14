import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function handler(req: NextApiRequest, res: NextApiResponse) {
  if ("id" in req.query) {
    res.status(200).json(req.query);
  }

  res.status(404).end("Not Found");
}

export async function bla() {
  console.log(await prisma.user.findFirst({ where: { email: "email" } }));
}

export default async function testCreate() {
  var result = null;

  try {
    result = await prisma.user.create({
      data: {
        name: "Jorge",
        username: "jorgito",
        email: "jorgito@nozama.cu",
        password: "trial",
      },
    });
  } catch (Error) {
    console.log("Username Already taken");
  }
}
