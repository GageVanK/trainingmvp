import { getServerSession } from "next-auth/next"
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: session.accessToken })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return NextResponse.json(response.data.items)
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json({ error: "Failed to fetch calendar events" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: session.accessToken })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  try {
    const { summary, description, start, end } = await req.json()

    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone: 'UTC' },
      end: { dateTime: end, timeZone: 'UTC' },
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error creating calendar event:', error)
    return NextResponse.json({ error: "Failed to create calendar event" }, { status: 500 })
  }
}

