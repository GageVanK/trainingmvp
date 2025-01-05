'use client'

import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/store', label: 'Store' },
  { href: '/programs', label: 'Programs' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black'
      }`}>
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-center justify-between h-12 px-4">
            <Link href="/" className="text-2xl font-bold text-red-600">
              MMA Elite
            </Link>
            <nav className="hidden md:flex space-x-6">
              {[
                { href: '/', label: 'Home' },
                { href: '/programs', label: 'Programs' },
                { href: '/trainers', label: 'Trainers' },
                { href: '/schedule', label: 'Schedule' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28">
        {children}
      </main>

      <footer className="bg-black text-gray-400 py-12 mt-20">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-300 mb-4">Programs</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">MMA</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">BJJ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Boxing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Muay Thai</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Private Training</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Group Classes</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Equipment Shop</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Nutrition</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-4">About MMA Elite</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Trainers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Facilities</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Schedule</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Location</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm">Copyright © {new Date().getFullYear()} MMA Elite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

