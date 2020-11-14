import { NextApiRequest, NextApiResponse } from "next";
import { UserDetails } from "../../../types/users";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
//getbyid delete put
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDetails>
) {
  if (req.method == "GET") {
    const result = await getById(req);
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            username: result.username,
            password: result.password,
            name: "",
            image: result.image,
          });
  } else if (req.method == "DELETE") {
    const result = await deleteUser(req);
    const user = result as User;
    if (result == "Error in deletion.") {
      res.status(401).end();
      return;
    }
    result == null ? res.status(401).end() : res.status(200).end();
  } else if (req.method == "PUT") {
    const result = await updateUser(req);
    result == null
      ? res.status(401).end()
      : res
          .status(200)
          .json({
            username: result.username,
            password: result.password,
            image: result.image,
            name: "",
          });
  }
}

async function getById(req: NextApiRequest) {
  //To get user
  const { id } = req.query;
  const ID = String(id);
  const result = await prisma.user.findFirst({ where: { username: ID } });
  return result;
}

async function deleteUser(req: NextApiRequest) {
  //To delete, just id of user is required
  const { id } = req.query;
  const ID = String(id);
  try {
    const result = await prisma.user.delete({ where: { username: ID } });
    await prisma.offer.deleteMany({ where: { idSeller: result.username } });
    await prisma.auction.deleteMany({ where: { idSeller: result.username } });

    return result;
  } catch (Error) {
    return "Error in deletion.";
  }
}

async function updateUser(req: NextApiRequest) {
  //To change password
  const { id } = req.query;
  const { password } = req.body;

  const ID = String(id);
  const passw = String(password);

  const result = await prisma.user.update({
    where: { username: ID },
    data: { password: passw },
  });
  return result;
}
