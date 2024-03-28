import React from "react";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
}

export const config = {
  matcher: ["/profile", "/create-prompt", "/update-prompt"],
};
