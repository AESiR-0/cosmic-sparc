import { Button } from "./ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#006D92] to-[#e28618] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-xl">Cosmic Sparc</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering event organizers across India with powerful tools to create, 
              manage, and grow their events. From tech meetups to cultural festivals, 
              we make event management seamless.
            </p>
            <div className="flex items-center gap-4">
              <Button size="sm" className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-10 h-10 p-0 bg-gray-800 hover:bg-gray-700">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Discover Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Create Event
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Event Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Ticketing System
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Analytics & Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Developer Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Community Forum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Press & Media
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pt-8 border-t border-gray-800">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#006D92]" />
                <span className="text-gray-400">hello@cosmicsparc.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#006D92]" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#006D92]" />
                <span className="text-gray-400">Rajkot, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#006D92]" />
                <span className="text-gray-400">www.cosmicsparc.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, tips, and event industry insights.
            </p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
              />
              <Button className="bg-[#006D92] hover:bg-[#e28618] px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">© 2025 Cosmic Sparc. All rights reserved.</span>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Made with ❤️ in India</span>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
} 