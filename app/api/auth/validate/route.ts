import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/app/database";
import { formatDateToPostgres } from "@/app/utils";

export async function POST(req: NextRequest) {

  const db = new Database;
  await db.begin();

  try {
    let authorization = await req.headers.get('authorization');

    let access_token = String(authorization).replace('Bearer ', '').trim()

    if (access_token == '') {
      throw Error('Sem codigo de acesso definido. Usuário não autênticado.');
    }

    let foundTokens: {
      rows: {
        user_id: number,
        username: string,
        status: number
      }[]
    } = await db.query('select t.token, t.status, t.user_id from access_tokens t where t.token = $1 and t.status = 1 and t.expiration_date >= $2', [
      access_token,
      formatDateToPostgres(new Date())
    ]);

    if (!(foundTokens.rows.length > 0)) throw new Error('Usuário não autênticado')

    let user = await db.query('select u.id, u.username from users u where u.id = $1', [
      foundTokens.rows[0].user_id
    ]);

    await db.save();

    return NextResponse.json({
      message: "Usuário verificado e autenticado!", body: access_token, user:user.rows[0] //test
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