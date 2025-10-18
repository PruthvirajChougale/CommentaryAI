import ConnectToDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
    console.log(year,typeof(year));
  try {
    await ConnectToDB();

    const db = mongoose.connection.db;
    const data = await db.collection("matches").findOne({ year: year });

    if (!data) {
      return new Response(JSON.stringify({ matches: [] }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ matches: data.match }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
