import type { NextApiRequest, NextApiResponse } from "next";
const whois = require("whois");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    whois.lookup(req.body, (err: any, data: any) => {
      if (err) {
        res.send(err);
        res.end();
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "max-age=180000");
      res.json(data);
      res.end();
    });
  } catch (error) {
    res.json(error);
    res.status(404).end();
  }
}
