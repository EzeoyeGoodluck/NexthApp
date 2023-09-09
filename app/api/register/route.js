import { connectMongoDB } from "/lib/mongodb";
import User from "models/user";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password} =  await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        


        return NextResponse.json({ message: "user registered"}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: "an erroe occured while regsitereing the user"}, { status: 500})
        
    }
}