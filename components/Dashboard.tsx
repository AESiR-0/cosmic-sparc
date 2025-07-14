import { Button } from "./ui/button";
import { 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  Bell,
  Settings,
  BarChart3,
  Ticket,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
      {/* Remove Navigation section here */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John! Here's what's happening with your events.</p>
          </div>
          <Button className="bg-[#006D92] hover:bg-[#e28618] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Events",
              value: "12",
              change: "+2",
              changeType: "up",
              icon: Calendar,
              color: "from-[#006D92] to-blue-600"
            },
            {
              title: "Active Events",
              value: "8",
              change: "+1",
              changeType: "up",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-600"
            },
            {
              title: "Total Revenue",
              value: "₹2.4L",
              change: "+12%",
              changeType: "up",
              icon: DollarSign,
              color: "from-[#e28618] to-orange-600"
            },
            {
              title: "Total Attendees",
              value: "1.2K",
              change: "+8%",
              changeType: "up",
              icon: Users,
              color: "from-purple-500 to-pink-600"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Events</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Cosmic Conclave 2025",
                    date: "July 28, 2025",
                    location: "Rajkot, Gujarat",
                    attendees: "1,153",
                    revenue: "₹5.7L",
                    status: "active",
                    rating: "4.9"
                  },
                  {
                    title: "TechXpo 2025",
                    date: "September 2, 2025",
                    location: "Vadodara, Gujarat",
                    attendees: "2,100",
                    revenue: "₹8.4L",
                    status: "upcoming",
                    rating: "4.8"
                  },
                  {
                    title: "Startup Meetup",
                    date: "June 15, 2025",
                    location: "Ahmedabad, Gujarat",
                    attendees: "450",
                    revenue: "₹2.2L",
                    status: "completed",
                    rating: "4.7"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Attendees</div>
                        <div className="font-semibold">{event.attendees}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Revenue</div>
                        <div className="font-semibold text-[#006D92]">{event.revenue}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'active' ? 'bg-green-100 text-green-700' :
                          event.status === 'upcoming' ? 'bg-blue-100 [#006D92]' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-[#006D92] hover:bg-[#e28618]">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="w-4 h-4 mr-2" />
                  Manage Tickets
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    action: "New ticket sold",
                    event: "Cosmic Conclave 2025",
                    time: "2 minutes ago",
                    type: "sale"
                  },
                  {
                    action: "Event published",
                    event: "TechXpo 2025",
                    time: "1 hour ago",
                    type: "publish"
                  },
                  {
                    action: "Review received",
                    event: "Startup Meetup",
                    time: "3 hours ago",
                    type: "review"
                  },
                  {
                    action: "Payment processed",
                    event: "Cosmic Conclave 2025",
                    time: "5 hours ago",
                    type: "payment"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'sale' ? 'bg-green-500' :
                      activity.type === 'publish' ? 'bg-blue-500' :
                      activity.type === 'review' ? 'bg-yellow-500' :
                      'bg-[#006D92]'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.event}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold mb-4">This Month's Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ticket Sales</span>
                  <span className="text-sm font-medium">+15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#006D92] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-medium">+23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#e28618] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attendees</span>
                  <span className="text-sm font-medium">+8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Cosmic Conclave 2025",
                  date: "July 28, 2025",
                  location: "Rajkot, Gujarat",
                  attendees: "1,153",
                  capacity: "2,000",
                  image: "from-[#006D92] to-[#e28618]"
                },
                {
                  title: "TechXpo 2025",
                  date: "September 2, 2025",
                  location: "Vadodara, Gujarat",
                  attendees: "2,100",
                  capacity: "2,500",
                  image: "from-green-500 to-emerald-500"
                },
                {
                  title: "Design Workshop",
                  date: "August 15, 2025",
                  location: "Surat, Gujarat",
                  attendees: "180",
                  capacity: "200",
                  image: "from-purple-500 to-pink-500"
                }
              ].map((event, index) => (
                <div key={index} className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className={`w-full h-24 bg-gradient-to-br ${event.image} rounded-lg mb-4 flex items-center justify-center`}>
                    <Calendar className="w-8 h-8 text-white opacity-80" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      {event.attendees}/{event.capacity} attendees
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 