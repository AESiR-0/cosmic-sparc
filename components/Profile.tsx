import { Button } from "./ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Bell, 
  Shield,
  CreditCard,
  Heart,
  Ticket,
  Star,
  Edit,
  Camera,
  Save,
  ArrowLeft,
  Globe,
  Lock,
  HelpCircle
} from "lucide-react";

export default function Profile() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
      {/* Navigation */}
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
            <Button variant="outline" className="border-gray-300">Sign In</Button>
            <Button className="bg-[#006D92] hover:bg-[#e28618]">Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">JD</span>
                  </div>
                  <Button size="sm" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 p-0">
                    <Camera className="w-3 h-3 text-gray-600" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Event Organizer</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#006D92]" />
                    <span className="text-sm font-medium">Events Created</span>
                  </div>
                  <span className="text-lg font-bold text-[#006D92]">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-[#e28618]" />
                    <span className="text-sm font-medium">Tickets Sold</span>
                  </div>
                  <span className="text-lg font-bold text-[#e28618]">1.2K</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">Rating</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-500">4.9</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Saved Events
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="w-4 h-4 mr-2" />
                  My Tickets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text" 
                    value="Rajkot, Gujarat"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea 
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  >
                    Passionate event organizer with 5+ years of experience in creating memorable experiences. Specialized in tech conferences and community events.
                  </textarea>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#006D92]/10 rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#006D92]" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e28618]/10 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-[#e28618]" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Notification Preferences</h4>
                      <p className="text-sm text-gray-600">Manage email and push notifications</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Privacy Settings</h4>
                      <p className="text-sm text-gray-600">Control your privacy and data</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment Methods</h4>
                      <p className="text-sm text-gray-600">Manage your payment options</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {[
                  {
                    action: "Created new event",
                    event: "Cosmic Conclave 2025",
                    time: "2 days ago",
                    type: "create"
                  },
                  {
                    action: "Sold 50 tickets",
                    event: "TechXpo 2025",
                    time: "1 week ago",
                    type: "sale"
                  },
                  {
                    action: "Received 5-star review",
                    event: "Startup Meetup",
                    time: "2 weeks ago",
                    type: "review"
                  },
                  {
                    action: "Updated event details",
                    event: "Design Workshop",
                    time: "3 weeks ago",
                    type: "update"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'create' ? 'bg-green-100' :
                      activity.type === 'sale' ? 'bg-blue-100' :
                      activity.type === 'review' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'create' && <Plus className="w-4 h-4 text-green-600" />}
                      {activity.type === 'sale' && <Ticket className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'review' && <Star className="w-4 h-4 text-yellow-600" />}
                      {activity.type === 'update' && <Edit className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.event}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-6">Connected Accounts</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">F</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Facebook</h4>
                      <p className="text-sm text-gray-600">Connected for social sharing</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">T</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Twitter</h4>
                      <p className="text-sm text-gray-600">Connected for social sharing</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">G</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Google</h4>
                      <p className="text-sm text-gray-600">Connected for calendar sync</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </div>
            </div>

            {/* Save Changes */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#006D92] hover:bg-[#e28618] flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 