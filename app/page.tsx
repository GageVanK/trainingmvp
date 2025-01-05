'use client'

import { useEffect, useRef, useState } from 'react'
import Layout from './components/layout'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CreditCard, Clock, Users, DumbbellIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgramCarousel } from './components/program-carousel'

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        const rate = scrolled * 0.5
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <div ref={parallaxRef} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="MMA Training"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-[980px] mx-auto">
            <h1 className="text-7xl font-bold mb-6 text-white leading-tight animate-fade-in">
              Unleash Your <span className="text-red-500">Inner Fighter</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl animate-fade-in animation-delay-300">
              Experience world-class MMA and BJJ training tailored to your goals. Elevate your skills, push your limits, and become the fighter you've always dreamed of being.
            </p>
            <Link href="/book" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center animate-fade-in animation-delay-600">
              Start Your Journey <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Carousel Section */}
      <ProgramCarousel />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 scroll-animate fade-up">Why Choose MMA Elite?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center scroll-animate fade-up">
                <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Trainers</h3>
                <p className="text-gray-600">Learn from seasoned MMA professionals with years of experience in the ring and on the mat.</p>
              </div>
              <div className="text-center scroll-animate fade-up animation-delay-300">
                <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DumbbellIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Personalized Training</h3>
                <p className="text-gray-600">Get customized training plans tailored to your skill level, goals, and preferred fighting style.</p>
              </div>
              <div className="text-center scroll-animate fade-up animation-delay-600">
                <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Flexible Payments</h3>
                <p className="text-gray-600">Choose from various payment options to fit your budget and training schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-[980px] mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 scroll-animate fade-up">Our Training Programs</h2>
            <Tabs defaultValue="all" className="mb-12">
              <TabsList className="bg-white justify-center">
                <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Programs</TabsTrigger>
                <TabsTrigger value="beginner" onClick={() => setActiveTab('beginner')}>Beginner</TabsTrigger>
                <TabsTrigger value="advanced" onClick={() => setActiveTab('advanced')}>Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Mixed Martial Arts', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' },
                { name: 'Brazilian Jiu-Jitsu', image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' },
                { name: 'Muay Thai', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' },
                { name: 'Boxing', image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
                { name: 'Wrestling', image: 'https://images.unsplash.com/photo-1579192181049-2aac794dd9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
                { name: 'Strength & Conditioning', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
              ].map((program, index) => (
                <div key={program.name} className="bg-white rounded-lg shadow-lg overflow-hidden scroll-animate fade-up" style={{animationDelay: `${index * 150}ms`}}>
                  <Image
                    src={program.image}
                    alt={program.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{program.name}</h3>
                    <p className="text-gray-600 mb-4">Master the techniques and strategies of {program.name.toLowerCase()} with our expert instructors.</p>
                    <Link href="/book" className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                      Learn More <ArrowRight className="inline ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="MMA Training"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-red-600 opacity-90 z-10"></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-4xl font-bold mb-8 scroll-animate fade-up">Ready to Start Your MMA Journey?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto scroll-animate fade-up animation-delay-300">Join MMA Elite today and transform your body, mind, and fighting skills. Our expert trainers are ready to guide you every step of the way.</p>
          <Link href="/book" className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center scroll-animate fade-up animation-delay-600">
            Book Your First Session <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </Layout>
  )
}

