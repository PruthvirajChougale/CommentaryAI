import ConnectToDB from "@/lib/db";
import axios from "axios";
import mongoose, { mongo } from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const year = searchParams.get("year");
    const id = searchParams.get("id");
    try{
        await ConnectToDB();
        const db = mongoose.connection.db;
        const data = await db.collection("matches").findOne({year});
        console.log(year);
        const matchDetails = data.match[id];

        const prompt = `
          You are a professional cricket commentator.
          Generate a 30-second commentary about this match situation:
          ${JSON.stringify(matchDetails, null, 2)}
          Return only the commentary text.`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const result = await model.generateContent(prompt);
        const commentary = result.response.text();

        const encodedKey = Buffer.from(`${process.env.DID_API_KEY}:`).toString("base64");
        console.log(process.env.DID_API_KEY);
        const talkResponse = await axios.post(
          "https://api.d-id.com/talks",
          {
            script: { type: "text", input: commentary },
            source_url: "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg", // can be your own
            driver_url: "bank://lively", // talking style
            config: { fluent: true, pad_audio: 0.5 }
          },
          {
            headers: {
              Authorization: `Basic ${encodedKey}`,
              "Content-Type": "application/json"
            }
          }
        );

        let videoUrl = null;
        while (!videoUrl) {
          const check = await axios.get(
            `https://api.d-id.com/talks/${talkResponse.data.id}`,
            { headers: { Authorization: `Basic ${encodedKey}` } }
          );

          if (check.data.result_url) {
            videoUrl = check.data.result_url;
            break;
          }

          console.log("Video generating...");
          await new Promise(r => setTimeout(r, 3000)); // wait 3 sec
        }

        console.log("Video ready:", videoUrl);


        return new Response(
          JSON.stringify({ videoUrl }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
    catch(error){
      console.error("Error generating commentary:", error);

      return new Response(
        JSON.stringify({
          message: "Server error",
          error: error.message,
          stack: error.stack
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}