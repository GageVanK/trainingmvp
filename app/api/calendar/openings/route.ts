import { getServerSession } from "next-auth/next"
import { google } from 'googleapis'
import { NextResponse } from 'next/server'
import { addDays, startOfDay, endOfDay, eachHourOfInterval, format, isWithinInterval, parseISO } from 'date-fns'

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const startParam = searchParams.get('start')
  
  const start = startParam ? startOfDay(parseISO(startParam)) : startOfDay(new Date())
  const end = endOfDay(addDays(start, 6))

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: session.accessToken })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items

    const openings = []
    const workingHours = { start: 9, end: 20 } // 9 AM to 8 PM

    for (let day = start; day <= end; day = addDays(day, 1)) {
      const dayStart = new Date(day.setHours(workingHours.start, 0, 0, 0))
      const dayEnd = new Date(day.setHours(workingHours.end, 0, 0, 0))

      const hoursInDay = eachHourOfInterval({ start: dayStart, end: dayEnd })

      hoursInDay.forEach(hour => {
        const hourEnd = new Date(hour.getTime() + 60 * 60 * 1000)
        const isBooked = events?.some(event => {
          const eventStart = new Date(event.start?.dateTime || event.start?.date)
          const eventEnd = new Date(event.end?.dateTime || event.end?.date)
          return isWithinInterval(hour, { start: eventStart, end: eventEnd }) ||
                 isWithinInterval(hourEnd, { start: eventStart, end: eventEnd })
        })

        if (!isBooked) {
          openings.push(format(hour, "yyyy-MM-dd'T'HH:mm:ssXXX"))
        }
      })
    }

    return NextResponse.json(openings)
  } catch (error) {
    console.error('Error fetching calendar openings:', error)
    return NextResponse.json({ error: "Failed to fetch calendar openings" }, { status: 500 })
  }
}

