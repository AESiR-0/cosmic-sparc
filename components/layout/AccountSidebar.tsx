'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Ticket, User, Calendar, LogOut, X } from 'lucide-react';

const nav = [
  { name: 'My Profile', href: '/account/profile', icon: User },
  { name: 'My Tickets', href: '/account/tickets', icon: Ticket },
  { name: 'Events You Have Been To', href: '/account/events', icon: Calendar },
  { name: 'Logout', href: '/account/logout', icon: LogOut },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-blue-100 flex flex-col py-8 px-4 relative">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 focus:outline-none"
        aria-label="Close account sidebar"
        onClick={() => router.push("/")}
      >
        <X className="w-5 h-5" />
      </button>
      <div className="mb-8 flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">CS</span>
        </div>
        <span className="font-bold text-xl text-gray-900">My Account</span>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                active ? 'bg-[#006D92] text-white' : 'text-gray-700 hover:bg-[#006D92]/10 hover:text-[#006D92]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 