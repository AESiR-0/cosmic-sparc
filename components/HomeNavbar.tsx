"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Menu, X, Ticket } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6F20] via-[#FFD700] to-[#0072B8] flex items-center justify-center shadow-md border-2 border-white/40">
            <Ticket className="w-6 h-6 text-white drop-shadow" />
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight drop-shadow-sm" style={{fontFamily: 'Geist, sans-serif'}}>Cosmic Sparc</span>
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#0072B8] font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className="text-[#0072B8] font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/logout" className="ml-2 px-4 py-2 rounded bg-[#0072B8] hover:bg-[#FF9A00] text-white font-semibold transition">
                Logout
              </Link>
            </>
          ) : (
            <>
                <Link href="/login" className="text-[#0072B8] font-medium transition-colors">
                Login
              </Link>
              <Link href="/signup" className="ml-2 px-4 py-2 rounded bg-[#FF6F20] hover:bg-[#FF9A00] text-white font-semibold transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#005B96]/80 backdrop-blur-md px-4 pb-4 pt-2 flex flex-col gap-2 border-b border-[#A3D5E0]/40">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-[#FFD700] font-medium py-2 border-b border-[#A3D5E0]/30"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className="text-white hover:text-[#FFD700] font-medium py-2 border-b border-[#A3D5E0]/30" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/logout" className="mt-2 px-4 py-2 rounded bg-[#FF6F20] hover:bg-[#FF9A00] text-white font-semibold transition" onClick={() => setMenuOpen(false)}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-[#FFD700] font-medium py-2 border-b border-[#A3D5E0]/30" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/signup" className="mt-2 px-4 py-2 rounded bg-[#FF6F20] hover:bg-[#FF9A00] text-white font-semibold transition" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
} 