import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { TOKEN } from "@/constants";

export default async function GET(req: NextRequest) {
  let authorization = req.headers.get("Authorization");

  if (!authorization) {
    return NextResponse.json({ message: "Without authorization" }, { status: 403 });
  }

  let auth = String(authorization).replace('Bearer ', '').trim()
  
  try {
    
    console.log();
    const secret = new TextEncoder().encode(TOKEN);
    
    console.log({auth});
    await jwtVerify(auth, secret)
    
    NextResponse.next();
  } catch (error) {

    console.log({error});
    

    return NextResponse.json({ message: "Not passed" }, { status: 403 });
  }


}

export const config = {
  matcher: ['/api/admin/:path*'],
};