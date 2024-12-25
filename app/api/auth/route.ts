import { NextRequest, NextResponse } from "next/server";
// import users    from 'database/users.json'
// import tokens    from 'database/tokens.json'
import jwt from 'jsonwebtoken'
import { writeFileSync } from "fs";
import path from "path";
import { TOKEN } from "@/constants";
import { Database } from "@/app/database";
import { compareSync } from 'bcrypt'

let tokenFile = path.join(process.cwd(), 'database', 'tokens.json');

export async function POST(req: NextRequest) {

    const db = new Database()
    
    await  db.begin();

    try {
        
        
        let body = await req.json()

        console.log({body});
        

        const foundUser = await db.query('select u.id, u.username, u.password from users u where u.username = $1 limit 1;', [body.username]);

        const userInfo: {
            id: number,
            username: string,
            password: string
        } = foundUser.rows[0]

        if(!compareSync(body.password, userInfo.password)){
            throw Error('Usuário ou senha não conferem. Por favor, verifique suas credênciais.')
        }

        const user = {
            id: userInfo.id,
           username: userInfo.username
        }

        

        const token = jwt.sign({
            user
        },TOKEN, {
            algorithm: 'HS256'
        })

        // tokens.push({
        //     token,
        //     user: user.id,
        //     status: 1,
        //     created_in_dt: new Date().toLocaleDateString(),
        //     created_in_hr: new Date().toLocaleTimeString()
        // })

        // writeFileSync(tokenFile, JSON.stringify(tokens))
        
        await db.save()
        
        return NextResponse.json({
            message: "Usuário autenticado!",
            user: user,
            token
        })
        
        
    } catch (error: any) {
        await db.rollback()
        return NextResponse.json({
            message: error.message
        }, {status: 403})
    }

}