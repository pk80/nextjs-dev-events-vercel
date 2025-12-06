import { Event } from "@/database";
import { RouteParams } from "@/lib/constants";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  // validate slug
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return NextResponse.json(
      { message: "Invalid or missing slug parameter" },
      { status: 400 }
    );
  }

  try {
    // connect to the database
    await connectDB();

    // sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // fetch event details
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug ${sanitizedSlug} not found` },
        { status: 404 }
      );
    }

    // return successful response with data
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // log error for debugging in developoment
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug: ", error);
    }

    // handle specific error types
    if (error instanceof Error) {
      // handle db connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }
      // handle generic error
      return NextResponse.json(
        {
          message: "Failed to fetch events",
          error: error.message,
        },
        { status: 500 }
      );
    }
    // handle unknown error
    return NextResponse.json(
      { message: "An unknown error occured", error: error },
      { status: 500 }
    );
  }
}
