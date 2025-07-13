import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '@/context/RootContext';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Events', href: '/dashboard/events' },
  { name: 'Create Event', href: '/dashboard/events/create' },
  { name: 'Tickets', href: '/dashboard/tickets' },
  { name: 'Users', href: '/dashboard/users' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'My Account', href: '/account' },
];

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }: DashboardSidebarProps) {
  const { user, signOut } = useContext(UserContext);

  return (
    <aside className={`fixed top-0 left-0 h-full z-40 bg-white/80 backdrop-blur-lg border-r border-gray-100 shadow-lg transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">CS</span>
          </div>
          <span className="font-bold text-lg text-gray-900">Cosmic Sparc</span>
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setSidebarOpen(false)}>
          <Menu className="w-5 h-5 text-[#006D92]" />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-[#006D92]/10 hover:text-[#006D92] font-medium transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-3">
        {user && (
          <>
            <div className="w-9 h-9 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{user.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">{user.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut} className="text-gray-400 hover:text-gray-600">
              <LogOut className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </aside>
  );
} 