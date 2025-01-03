import { NextResponse } from "next/server";

export const middleware = (request) => {
  console.log("Middleware is running !");
  //   const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = request.cookies.get("MaphyCookie")?.value;
    const session = request.cookies.get("_Secure-next-auth.session-token")?.value;
    //   const isTokenCorrect = jwt.verify(token, secretKey);
    if (
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/login"
    ) {
      if (token || session) {
        console.log(`The MaphyCookie is ${token}`);
        console.log(`The _Secure-next-auth.session-token is ${session}`);
        return NextResponse.redirect(new URL("/", request.url));
      } else if (!token && !session) {
        console.log(`The MaphyCookie is ${token}`);
        console.log(`The _Secure-next-auth.session-token is ${session}`);
        return;
      }
    } else if (request.nextUrl.pathname === "/myblogs") {
      if (token || session) {
        console.log(`The MaphyCookie is ${token}`);
        console.log(`The _Secure-next-auth.session-token is ${session}`);
        return;
      } else if (!token && !session) {
        console.log(`The MaphyCookie is ${token}`);
        console.log(`The _Secure-next-auth.session-token is ${session}`);
        return NextResponse.redirect(new URL("/register", request.url));
      }
    }
  } catch (err) {
    console.log(`Error in middleware is ${err}`);
  }
};
export const config = {
  matcher: ["/", "/login", "/register", "/myblogs"],
};
