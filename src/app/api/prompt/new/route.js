import Prompt from "@models/prompt.model";
import DBConnection from "@utils/DBConnect";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { userId, prompt, tag } = await req.json();
  try {
    await DBConnection();

    const newPrompt = await Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();

    return new NextResponse(
      {
        newPrompt,
        message: "Prompt Created",
      },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      {
        message: "Prompt Not Created",
      },
      {
        status: 400,
      }
    );
  }
}
