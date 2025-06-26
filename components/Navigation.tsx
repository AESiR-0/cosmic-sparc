import { Button } from "./ui/button";
import { Bell, Settings, User } from "lucide-react";

interface NavigationProps {
  showUserMenu?: boolean;
  userName?: string;
  userInitials?: string;
}

export default function Navigation({ showUserMenu = false, userName = "John Doe", userInitials = "JD" }: NavigationProps) {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Cosmic Sparc</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Discover</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Create Event</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          
          {showUserMenu ? (
            <>
              <Button variant="outline" className="border-gray-300">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{userInitials}</span>
              </div>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-gray-300">Sign In</Button>
              <Button className="bg-[#006D92] hover:bg-[#EF7B45]">Get Started</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 