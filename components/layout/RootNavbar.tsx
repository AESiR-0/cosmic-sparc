"use client"

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { UserContext, LocationContext } from '@/context/RootContext';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, MapPin, Filter } from 'lucide-react';

interface RootNavbarProps {
  context?: 'public' | 'dashboard' | 'account';
}

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
];

export default function RootNavbar({ context = 'public' }: RootNavbarProps) {
  const { user, signOut } = useContext(UserContext);
  const { city, setCity } = useContext(LocationContext);
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Cosmic Sparc</span>
          </Link>
          {/* Center Navigation (context-aware) */}
          <div className="hidden md:flex items-center gap-6">
            {context === 'public' && <>
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Discover</Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors">Categories</Link>
              <Link href="/dashboard/events/create" className="text-gray-600 hover:text-gray-900 transition-colors">Create Event</Link>
            </>}
            {context === 'dashboard' && <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/dashboard/events" className="text-gray-600 hover:text-gray-900 transition-colors">Events</Link>
              <Link href="/dashboard/tickets" className="text-gray-600 hover:text-gray-900 transition-colors">Tickets</Link>
              <Link href="/dashboard/users" className="text-gray-600 hover:text-gray-900 transition-colors">Users</Link>
            </>}
            {context === 'account' && <>
              <Link href="/account" className="text-gray-600 hover:text-gray-900 transition-colors">My Account</Link>
              <Link href="/account/tickets" className="text-gray-600 hover:text-gray-900 transition-colors">My Tickets</Link>
              <Link href="/account/settings" className="text-gray-600 hover:text-gray-900 transition-colors">Settings</Link>
            </>}
          </div>
          {/* Right: Location & User */}
          <div className="flex items-center gap-4">
            {/* Location Selector */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#006D92]/10 hover:bg-[#006D92]/20 border border-[#006D92]/20 text-[#006D92] text-sm font-medium transition"
              onClick={() => setShowLocationModal(true)}
            >
              <MapPin className="w-4 h-4" />
              <span>{city || 'Select City'}</span>
              <Filter className="w-3 h-3" />
            </button>
            {/* User/Account */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/account" className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/60 hover:bg-white/80 border border-gray-200 text-[#006D92] text-sm font-medium transition">
                  <User className="w-4 h-4" />
                  {user.email?.split('@')[0]}
                </Link>

              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login"><Button variant="outline" className="border-gray-300">Sign In</Button></Link>
                <Link href="/signup"><Button className="bg-[#006D92] hover:bg-[#e28618]">Get Started</Button></Link>
              </div>
            )}
            {/* Mobile menu button */}
            <button className="md:hidden ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <Menu className="w-6 h-6 text-[#006D92]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Select Your City</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {CITIES.map(cityOption => (
                <button
                  key={cityOption}
                  onClick={() => {
                    setCity && setCity(cityOption);
                    setShowLocationModal(false);
                  }}
                  className={`p-3 rounded-lg border text-left transition ${city === cityOption
                      ? 'bg-[#006D92]/10 border-[#006D92] text-[#006D92]'
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {cityOption}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full mt-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
} 