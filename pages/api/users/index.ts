import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { UserPreview } from "../../../types/users";
import { request } from "http";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreview | UserPreview[]>
) {
  //To get all user
  if (req.method == "GET") {
    const result = await prisma.user.findMany();
    if (result == null) {
      res.status(401).end();
    } else {
      const user: UserPreview[] = [];
      for (let i = 0; i < result.length; i++) {
        user.push({
          username: result[i].username,
          password: result[i].username,
        });
      }
      res.status(200).json(user);
    }
  } else if (req.method == "POST") {
    const result = await postUser(req);
    const user = result as User;
    if (result == "Error in user creation.") {
      res.status(401).end();
      return;
    }
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({ username: user.username, password: user.password });
  }
}

async function getAllUser(req: NextApiRequest) {
  //To get all user

  const result = await prisma.user.findMany();
  return result;
}

async function postUser(req: NextApiRequest) {
  //To register, it is required name  username, email, password
  const { password } = req.body;
  const { id } = req.query;

  const user = String(id);
  const passw = String(password);

  try {
    const result = await prisma.user.create({
      data: { username: user, password: passw },
    });
    return result;
  } catch (Error) {
    return "Error in user creation.";
  }
}
