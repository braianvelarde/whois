import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.json(req.socket.remoteAddress);
    res.end();
  } catch (error) {
    res.send(error);
    res.end();
  }
}
