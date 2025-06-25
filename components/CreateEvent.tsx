import { Button } from "./ui/button";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Upload, 
  Plus, 
  Trash2, 
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  Settings,
  Image,
  FileText,
  DollarSign,
  Tag
} from "lucide-react";

export default function CreateEvent() {
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600">Set up your event details and start selling tickets</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Basic Info", active: true },
              { step: 2, label: "Details", active: false },
              { step: 3, label: "Tickets", active: false },
              { step: 4, label: "Review", active: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  item.active 
                    ? 'bg-[#006D92] text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  item.active ? 'text-[#006D92]' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    item.active ? 'bg-[#006D92]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step 1: Basic Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your event title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                />
              </div>

              {/* Event Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent">
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="music">Music & Arts</option>
                  <option value="business">Business</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="sports">Sports</option>
                  <option value="food">Food & Drink</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Event Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image *
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#006D92] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Time *
                  </label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Location *
                </label>
                <input 
                  type="text" 
                  placeholder="Enter venue name or address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Capacity
                </label>
                <input 
                  type="number" 
                  placeholder="Enter maximum number of attendees"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button className="bg-[#006D92] hover:bg-[#e28618] flex items-center gap-2">
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Button className="w-12 h-12 bg-[#006D92] hover:bg-[#e28618] rounded-full shadow-lg">
            <Settings className="w-5 h-5" />
          </Button>
          <Button className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200">
            <Eye className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </main>
  );
} 