import { Button } from "./ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Share2, 
  Heart, 
  ArrowLeft,
  Ticket,
  Phone,
  Mail,
  Globe,
  Camera,
  Play,
  Shield,
  CheckCircle
} from "lucide-react";

export default function EventDetails() {
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#006D92]/10 text-[#006D92] px-3 py-1 rounded-full text-sm font-medium">
                      Technology
                    </span>
                    <span className="bg-[#e28618]/10 text-[#e28618] px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Cosmic Conclave 2025
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Join us for the biggest tech conference in Gujarat, featuring industry leaders, 
                    innovative workshops, and networking opportunities.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Event Image */}
              <div className="relative h-80 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-xl mb-6 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                  Featured Event
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#006D92]/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#006D92]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold">July 28, 2025</p>
                    <p className="text-sm text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e28618]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#e28618]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">Rajkot Convention Center</p>
                    <p className="text-sm text-gray-600">Rajkot, Gujarat</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="font-semibold">1,200+</p>
                    <p className="text-sm text-gray-600">Expected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">About This Event</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Cosmic Conclave 2025 is the premier technology conference in Gujarat, bringing together 
                  industry leaders, innovators, and tech enthusiasts for a day of learning, networking, 
                  and inspiration.
                </p>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900">What to Expect</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Keynote speeches from tech industry leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Interactive workshops on emerging technologies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Networking sessions with professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Startup showcase and pitch competitions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Exhibition of latest tech products</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Agenda</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 w-20">9:00 AM</div>
                    <div>
                      <h4 className="font-semibold">Opening Ceremony</h4>
                      <p className="text-sm text-gray-600">Welcome address and conference overview</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 w-20">10:00 AM</div>
                    <div>
                      <h4 className="font-semibold">Keynote Session</h4>
                      <p className="text-sm text-gray-600">Future of AI and Machine Learning</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 w-20">2:00 PM</div>
                    <div>
                      <h4 className="font-semibold">Workshop Sessions</h4>
                      <p className="text-sm text-gray-600">Hands-on workshops on various technologies</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500 w-20">5:00 PM</div>
                    <div>
                      <h4 className="font-semibold">Networking & Closing</h4>
                      <p className="text-sm text-gray-600">Networking session and closing remarks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6">Organizer</h2>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TC</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">TechConnect Gujarat</h3>
                  <p className="text-gray-600 mb-4">
                    Leading technology community and event organizer in Gujarat, dedicated to fostering 
                    innovation and connecting tech professionals.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-500">(156 events)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#006D92]" />
                      <span className="text-gray-500">15k+ followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#006D92] mb-2">₹499</div>
                  <div className="text-sm text-gray-500">per ticket</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Available tickets</span>
                    <span className="font-medium">847 remaining</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Event date</span>
                    <span className="font-medium">July 28, 2025</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Refund policy</span>
                    <span className="font-medium text-green-600">Full refund</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">General Admission</div>
                      <div className="text-sm text-gray-500">Access to all sessions</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹499</div>
                      <div className="text-sm text-gray-500">per ticket</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">VIP Pass</div>
                      <div className="text-sm text-gray-500">Premium seating + networking</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹1,299</div>
                      <div className="text-sm text-gray-500">per ticket</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-[#006D92] hover:bg-[#e28618] py-3 text-lg">
                    <Ticket className="w-5 h-5 mr-2" />
                    Book Tickets
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      By booking, you agree to our terms and conditions
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                <h3 className="font-bold mb-4">Event Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total capacity</span>
                    <span className="font-medium">2,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tickets sold</span>
                    <span className="font-medium">1,153</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Days left</span>
                    <span className="font-medium text-[#e28618]">45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 