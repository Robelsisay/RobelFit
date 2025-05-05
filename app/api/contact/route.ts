import { NextResponse } from "next/server"
import { sendContactEmail } from "@/app/actions/email"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = await sendContactEmail(formData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server error, please try again later",
      },
      { status: 500 },
    )
  }
}
