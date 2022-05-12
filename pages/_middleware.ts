import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ip = req.ip;
  console.log(ip);
  return new Response("hello");
}
