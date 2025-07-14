'use client'
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Search, 
  Users, 
  Star, 
  Shield, 
  TrendingUp,
  Music,
  Camera,
  Code,
  Heart,
  ArrowRight,
  Play,
  Filter,
  Menu,
  X
} from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
      {/* Hero Section with Search */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#006D92] to-[#e28618] bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From tech meetups to cultural festivals, find events that inspire and connect communities across India
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search events, venues, or organizers..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#006D92] hover:bg-[#e28618] px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#006D92]" />
              <span>2M+ Attendees</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#e28618]" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#006D92]" />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Browse */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Music, label: "Music & Arts", color: "from-purple-500 to-pink-500" },
            { icon: Camera, label: "Photography", color: "from-blue-500 to-cyan-500" },
            { icon: Code, label: "Technology", color: "from-green-500 to-emerald-500" },
            { icon: Heart, label: "Health & Wellness", color: "from-red-500 to-orange-500" },
          ].map((category, index) => (
            <Link key={index} href="/dashboard/events" className="group cursor-pointer">
              <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${category.color} p-6 flex flex-col items-center justify-center text-white transition-transform group-hover:scale-105`}>
                <category.icon className="w-8 h-8 mb-3" />
                <span className="font-semibold text-center">{category.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Events</h2>
          <Link href="/dashboard/events">
            <Button variant="outline" className="flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event Card 1 */}
          <Link href="/dashboard/events" className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 bg-gradient-to-br from-[#006D92] to-[#e28618] flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                ₹499
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#006D92]/10 text-[#006D92] px-3 py-1 rounded-full text-sm font-medium">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  28 July
                </span>
                <span className="bg-[#e28618]/10 text-[#e28618] px-3 py-1 rounded-full text-sm font-medium">
                  <Users className="w-3 h-3 inline mr-1" />
                  1.2k attending
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#006D92] transition-colors">
                Cosmic Conclave 2025
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-[#e28618]" />
                <span>Rajkot, Gujarat</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-gray-500">(234 reviews)</span>
                </div>
                <Button size="sm" className="bg-[#006D92] hover:bg-[#e28618]">
                  Book Now
                </Button>
              </div>
            </div>
          </Link>

          {/* Event Card 2 */}
          <Link href="/dashboard/events" className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Music className="w-12 h-12 text-white opacity-80" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                ₹299
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#006D92]/10 text-[#006D92] px-3 py-1 rounded-full text-sm font-medium">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  15 August
                </span>
                <span className="bg-[#e28618]/10 text-[#e28618] px-3 py-1 rounded-full text-sm font-medium">
                  <Users className="w-3 h-3 inline mr-1" />
                  856 attending
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#006D92] transition-colors">
                Navratri Nights Festival
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-[#e28618]" />
                <span>Surat, Gujarat</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.7</span>
                  <span className="text-sm text-gray-500">(189 reviews)</span>
                </div>
                <Button size="sm" className="bg-[#006D92] hover:bg-[#e28618]">
                  Book Now
                </Button>
              </div>
            </div>
          </Link>

          {/* Event Card 3 */}
          <Link href="/dashboard/events" className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Code className="w-12 h-12 text-white opacity-80" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                ₹799
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#006D92]/10 text-[#006D92] px-3 py-1 rounded-full text-sm font-medium">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  2 September
                </span>
                <span className="bg-[#e28618]/10 text-[#e28618] px-3 py-1 rounded-full text-sm font-medium">
                  <Users className="w-3 h-3 inline mr-1" />
                  2.1k attending
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#006D92] transition-colors">
                TechXpo 2025
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-[#e28618]" />
                <span>Vadodara, Gujarat</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-gray-500">(312 reviews)</span>
                </div>
                <Button size="sm" className="bg-[#006D92] hover:bg-[#e28618]">
                  Book Now
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How Cosmic Sparc Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "Create Your Event",
              description: "Set up event details, tickets, and forms in minutes with our intuitive builder.",
              color: "from-[#006D92] to-blue-600"
            },
            {
              icon: Ticket,
              title: "Sell Tickets",
              description: "Share your event and start selling tickets instantly with secure payment processing.",
              color: "from-[#e28618] to-orange-600"
            },
            {
              icon: Users,
              title: "Manage Attendees",
              description: "Scan tickets, manage check-ins, and engage with your audience in real-time.",
              color: "from-[#006D92] to-[#e28618]"
            }
          ].map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Event Organizers Across India</h2>
            <p className="text-gray-600 text-lg">Join thousands of organizers who trust Cosmic Sparc</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Events Created" },
              { number: "2M+", label: "Tickets Sold" },
              { number: "500+", label: "Cities Covered" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#006D92] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#006D92] to-[#e28618] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Your Next Event?</h2>
          <p className="text-xl mb-8 opacity-90">Join Cosmic Sparc and unlock powerful tools to grow your events</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/events/create">
              <Button size="lg" className="bg-white text-[#006D92] hover:bg-gray-100 px-8 py-4 text-lg">
                Start Creating Events
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#006D92] px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 