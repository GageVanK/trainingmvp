'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Layout from '../components/layout'
import { format, parseISO, addDays, startOfWeek } from 'date-fns'

export default function Book() {
  const { data: session, status } = useSession()
  const [openings, setOpenings] = useState<string[]>([])
  const [selectedOpening, setSelectedOpening] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()))

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOpenings()
    }
  }, [status, currentWeek])

  const fetchOpenings = async () => {
    const response = await fetch(`/api/calendar/openings?start=${currentWeek.toISOString()}`)
    const data = await response.json()
    setOpenings(data)
  }

  const handleBooking = async () => {
    if (selectedOpening) {
      const event = {
        summary: 'MMA Training Session',
        description: notes,
        start: { dateTime: selectedOpening },
        end: { dateTime: new Date(new Date(selectedOpening).getTime() + 60 * 60 * 1000).toISOString() },
      }

      try {
        const response = await fetch('/api/calendar/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        })

        if (response.ok) {
          alert('Booking confirmed and added to Google Calendar!')
          fetchOpenings()
          setSelectedOpening(null)
          setNotes('')
        } else {
          throw new Error('Failed to create event')
        }
      } catch (error) {
        console.error('Error creating event:', error)
        alert('Failed to create booking. Please try again.')
      }
    }
  }

  const prevWeek = () => setCurrentWeek(addDays(currentWeek, -7))
  const nextWeek = () => setCurrentWeek(addDays(currentWeek, 7))

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-4xl font-bold mb-8 text-red-600">Sign in to Book a Session</h1>
            <button
              onClick={() => signIn('google')}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-red-600">Book Your Training Session</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {format(currentWeek, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button onClick={prevWeek} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button onClick={nextWeek} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {openings.map((opening) => (
              <button
                key={opening}
                onClick={() => setSelectedOpening(opening)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedOpening === opening
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock className="inline-block mr-1 h-4 w-4" />
                {format(parseISO(opening), 'EEE, MMM d')}
                <br />
                {format(parseISO(opening), 'h:mm a')}
              </button>
            ))}
          </div>
        </div>
        {selectedOpening && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Details</h2>
            <p className="mb-4 text-gray-600">
              <CalendarIcon className="inline-block mr-2 h-5 w-5 text-red-600" />
              <span className="font-medium">{format(parseISO(selectedOpening), 'MMMM d, yyyy')}</span> at{' '}
              <span className="font-medium">{format(parseISO(selectedOpening), 'h:mm a')}</span>
            </p>
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes:
              </label>
              <textarea
                id="notes"
                rows={4}
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any special requests or information for the trainer..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleBooking}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

