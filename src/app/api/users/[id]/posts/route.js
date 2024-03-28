import Prompt from "@models/prompt.model";
import DBConnection from "@utils/DBConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await DBConnection();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new NextResponse(
      JSON.stringify(
        {
          prompts: prompts,
          message: "Prompts Fetch Successfully",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new NextResponse(
      {
        message: "Prompts Fetch Error",
      },
      {
        status: 400,
      }
    );
  }
}
