'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const programs = [
  {
    category: 'Mixed Martial Arts',
    title: 'Complete Fighter Program',
    description: 'Master all aspects of MMA',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    category: 'Brazilian Jiu-Jitsu',
    title: 'Ground Mastery',
    description: 'Dominate on the ground',
    image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4',
    color: 'bg-gradient-to-br from-purple-400 to-pink-600'
  },
  {
    category: 'Striking',
    title: 'Elite Boxing Program',
    description: 'Perfect your striking game',
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    color: 'bg-gradient-to-br from-red-400 to-red-600'
  },
  {
    category: 'Conditioning',
    title: 'Fighter Fitness',
    description: 'Build your fighting strength',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd',
    color: 'bg-gradient-to-br from-teal-400 to-teal-600'
  }
]

export function ProgramCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })

      // Update scroll buttons visibility after animation
      setTimeout(() => {
        if (carouselRef.current) {
          setCanScrollLeft(carouselRef.current.scrollLeft > 0)
          setCanScrollRight(
            carouselRef.current.scrollLeft < 
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth
          )
        }
      }, 300)
    }
  }

  return (
    <div className="relative py-12 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 h-[700px]">
        <h2 className="text-4xl font-bold mb-8">Explore our programs.</h2>
        
        <div className="relative group h-full">
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory h-full items-center"
          >
            {programs.map((program, index) => (
              <div
                key={index}
                className="relative flex-none w-[400px] h-[550px] rounded-[2.5rem] overflow-hidden snap-start transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
              >
                <div className={cn(
                  "absolute inset-0 opacity-90",
                  program.color
                )} />
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover mix-blend-overlay"
                  quality={90}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">
                      {program.category}
                    </p>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {program.title}
                    </h3>
                    <p className="text-lg text-white/90">
                      {program.description}
                    </p>
                  </div>
                  <Link
                    href="/book"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 self-end transform hover:-translate-y-2"
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              !canScrollLeft && "hidden"
            )}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => scroll('right')}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              !canScrollRight && "hidden"
            )}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

