import { NextResponse } from "next/server";

export function proxy(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const { ALLOWED_CONNECT_SRC } = process.env;

  const cspHeader = `
    default-src 'self';
    media-src 'self' ${ALLOWED_CONNECT_SRC} data:;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    connect-src 'self' ${ALLOWED_CONNECT_SRC};
  img-src 'self' ${ALLOWED_CONNECT_SRC} blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    frame-src ${ALLOWED_CONNECT_SRC}
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // requestHeaders.set(
  //   "Content-Security-Policy",
  //   contentSecurityPolicyHeaderValue
  // );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  let cspHeaderKey = "Content-Security-Policy";

  if (process.env.NODE_ENV == "development") {
    cspHeaderKey += "-Report-Only";
  }
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialess');


  response.headers.set(cspHeaderKey, contentSecurityPolicyHeaderValue);

  return response;

  
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
