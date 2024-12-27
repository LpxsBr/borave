import { Database } from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const db = new Database;
  await db.begin();
  
  try {
    let authorization = await req.headers.get('authorization');
    
    let access_token = String(authorization).replace('Bearer ', '').trim()
    
    if(access_token == ''){
      throw Error('Sem codigo de acesso definido');
    }
    
    await db.query('update access_tokens t set t.status = 0 where t.token = $1', [
      access_token
    ]);

    await db.save();
    
    return NextResponse.json({
      message: "Deslogado!", body: access_token, //test
    });
  } catch (error: any) {
    await db.rollback();
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 403 }
    );
  }
}