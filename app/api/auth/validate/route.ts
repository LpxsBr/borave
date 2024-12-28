import { NextRequest, NextResponse } from "next/server";
// import jwt from 'jsonwebtoken'
import { writeFileSync } from "fs";
import path from "path";
import { Database } from "@/app/database";

// let tokenFile = path.join(process.cwd(), 'database', 'tokens.json');

export async function POST(req: NextRequest) {
  
  const db = new Database;
  await db.begin();
  
  try {
    let authorization = await req.headers.get('authorization');
    
    let access_token = String(authorization).replace('Bearer ', '').trim()
    
    if(access_token == ''){
      throw Error('Sem codigo de acesso definido. Usuário não autênticado.');
    }
    
    let foundTokens: {
      rows: {
        user_id: number,
        username: string,
        status: number
      }[]
    } = await db.query('select t.token, t.status, t.user_id from access_tokens t where t.token = $1 and t.status = 1', [
      access_token
    ]);

    if(!(foundTokens.rows.length > 0)) throw new Error('Usuário não autênticado')

    let user = await db.query('select u.id, u.username from users u where u.id = $1', [
      foundTokens.rows[0].user_id
    ]);

    await db.save();
    
    return NextResponse.json({
      message: "Usuário verificado e autenticado!", body: access_token, user //test
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