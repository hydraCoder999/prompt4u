import Prompt from "@models/prompt.model";
import DBConnection from "@utils/DBConnect";
import { NextResponse } from "next/server";
// get

export async function GET(req, { params }) {
  try {
    await DBConnection();
    const prompt = await Prompt.findById(params?.id).populate("creator");

    if (!prompt) {
      return new NextResponse(
        JSON.stringify(
          {
            message: "Prompt Not Found",
          },
          {
            status: 404,
          }
        )
      );
    }
    return new NextResponse(
      JSON.stringify(
        {
          prompt,
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
// update

export async function PATCH(req, { params }) {
  try {
    const { prompt, tag } = await req.json();
    await DBConnection();
    const existing_prompt = await Prompt.findById(params?.id).populate(
      "creator"
    );

    if (!existing_prompt) {
      return new NextResponse(
        JSON.stringify(
          {
            message: "Prompt Not Found",
          },
          {
            status: 404,
          }
        )
      );
    }

    existing_prompt.prompt = prompt;
    existing_prompt.tag = tag;

    await existing_prompt.save();
    return new NextResponse(
      JSON.stringify(
        {
          existing_prompt: existing_prompt,
          message: "Prompt Update Successfully",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new NextResponse(
      {
        message: "Prompts Update Error",
      },
      {
        status: 400,
      }
    );
  }
}
// delete
export async function DELETE(req, { params }) {
  try {
    await DBConnection();
    const delete_prompt = await Prompt.findByIdAndDelete(params?.id);

    if (!delete_prompt) {
      return new NextResponse(
        JSON.stringify(
          {
            message: "Prompt Not Found",
          },
          {
            status: 404,
          }
        )
      );
    }

    return new NextResponse(
      JSON.stringify(
        {
          message: "Prompt Delete Successfully",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    return new NextResponse(
      {
        message: "Prompts Delete Error",
      },
      {
        status: 400,
      }
    );
  }
}
