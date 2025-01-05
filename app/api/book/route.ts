import { google } from 'googleapis'
import { NextResponse } from 'next/server'
import { authenticate } from '@google-cloud/local-auth'
import { addMinutes, parseISO } from 'date-fns'

const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

export async function POST(req: Request) {
  try {
    const { date, time } = await req.json()

    const auth = await authenticate({
      scopes: SCOPES,
      keyfilePath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })

    const calendar = google.calendar({ version: 'v3', auth })

    const startDateTime = parseISO(`${date}T${time}`)
    const endDateTime = addMinutes(startDateTime, 60) // Assuming 1-hour sessions

    const event = {
      summary: 'MMA Training Session',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York', // Adjust this to your timezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York', // Adjust this to your timezone
      },
    }

    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    return NextResponse.json({ success: true, eventLink: result.data.htmlLink })
  } catch (error) {
    console.error('Error booking session:', error)
    return NextResponse.json({ success: false, error: 'Failed to book session' }, { status: 500 })
  }
}

