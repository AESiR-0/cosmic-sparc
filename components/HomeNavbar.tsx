"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Menu, X, Ticket, Search } from "lucide-react";

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const links = [
    { name: "Discover", href: "/" },
    { name: "Create Event", href: "/dashboard/events/create" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0072B8]/20 backdrop-blur-md border-b border-[#A3D5E0]/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6F20] via-[#FFD700] to-[#0072B8] flex items-center justify-center shadow-md border-2 border-white/40">
            <Ticket className="w-6 h-6 text-white drop-shadow" />
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight drop-shadow-sm" style={{ fontFamily: 'Geist, sans-serif' }}>Cosmic Sparc</span>
        </Link>
        {/* Search Input */}
        <form className="flex-1 max-w-xl mx-6 flex items-center bg-white/80 rounded-full shadow px-4 py-2 border border-blue-100 focus-within:ring-2 focus-within:ring-blue-400">
          <Search className="w-5 h-5 text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Search events, venues, or keywords..."
            className="flex-1 bg-transparent border-none outline-none text-lg text-[#006D92]"
            // TODO: Connect to search/filter state
          />
        </form>
        {/* Actions: Browse Events, Auth Links */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/events" className="px-4 py-2 rounded-full bg-[#FF6F20] hover:bg-[#FF9A00] text-white font-semibold shadow transition">Browse Events</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-[#0072B8] font-medium transition-colors">Dashboard</Link>
              <Link href="/logout" className="ml-2 px-4 py-2 rounded bg-[#0072B8] hover:bg-[#FF9A00] text-white font-semibold transition">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#0072B8] font-medium transition-colors">Login</Link>
              <Link href="/signup" className="ml-2 px-4 py-2 rounded bg-[#FF6F20] hover:bg-[#FF9A00] text-white font-semibold transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 