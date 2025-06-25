'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
      {/* Navigation */}
      <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Cosmic Sparc</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Discover</Link>
            <Link href="/dashboard/events/create" className="text-gray-600 hover:text-gray-900 transition-colors">Create Event</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/login">
              <Button variant="outline" className="border-gray-300">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#006D92] hover:bg-[#e28618]">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#006D92] to-[#e28618] bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your event management needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Up to 3 events per month</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Basic event management</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Email support</span>
              </li>
            </ul>
            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full">Get Started Free</Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl border-2 border-[#006D92] p-8 hover:shadow-lg transition-shadow relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#006D92] text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹999<span className="text-lg text-gray-600">/month</span></div>
              <p className="text-gray-600">For growing event organizers</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Unlimited events</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Custom branding</span>
              </li>
            </ul>
            <Link href="/signup" className="block">
              <Button className="w-full bg-[#006D92] hover:bg-[#e28618]">Start Pro Trial</Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
              <p className="text-gray-600">For large organizations</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>SLA guarantee</span>
              </li>
            </ul>
            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">Join thousands of event organizers using Cosmic Sparc</p>
          <Link href="/signup">
            <Button size="lg" className="bg-[#006D92] hover:bg-[#e28618] px-8 py-4 text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
} 