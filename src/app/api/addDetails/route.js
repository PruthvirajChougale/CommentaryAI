import ConnectToDB from "../../../lib/db"; // your ConnectToDB function

export async function POST(){
    const db = await ConnectToDB(); // connect to MongoDB
    const collection = db.connection.db.collection('matches'); // collection name 'countries'
    
    const result = await collection.insertOne({ name: "India" }); // insert document
    console.log("Inserted document:", result);
}

addCountry();
