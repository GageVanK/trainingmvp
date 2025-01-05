'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const programs = [
  { name: 'MMA', href: '/programs/mma', isNew: true },
  { name: 'BJJ', href: '/programs/bjj' },
  { name: 'Boxing', href: '/programs/boxing', isNew: true },
  { name: 'Muay Thai', href: '/programs/muay-thai' },
  { name: 'Wrestling', href: '/programs/wrestling', isNew: true },
  { name: 'Compare', href: '/compare' },
  { name: 'Equipment', href: '/equipment' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Book Now', href: '/book' },
]

export function NavIcons() {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex justify-center space-x-8 py-4 px-4 min-w-max">
        {programs.map((program) => (
          <Link
            key={program.name}
            href={program.href}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gray-800 transition-colors">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt={program.name}
                width={40}
                height={40}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {program.name}
            </span>
            {program.isNew && (
              <span className="text-xs text-red-500 mt-1">New</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

