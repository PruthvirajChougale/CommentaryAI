import ConnectToDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");
    const year = searchParams.get("year");
    try{
        await ConnectToDB();
        const db = mongoose.connection.db;
        const data = await db.collection("matches").findOne({year});
        console.log(year);
        const matchDetails = data.match[id];
        return new Response(JSON.stringify({matchDetails}),
            {status:200,headers: { "Content-Type": "application/json" }}
        );
    }
    catch(error){
        console.error(error);
        return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
        );

    }
}