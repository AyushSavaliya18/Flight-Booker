import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'wouter';

export function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SkyBook</span>
            </div>
            <p className="text-slate-400 mb-6">
              Your trusted partner for booking flights worldwide. We offer the best prices and seamless booking experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setLocation('/'); }} className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setLocation('/flights'); }} className="text-slate-400 hover:text-white transition-colors">Search Flights</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Deals & Offers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Travel Guide</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Flight Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@skybook.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>123 Aviation Way,<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 SkyBook. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-slate-400">We accept:</span>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium">VISA</div>
                <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium">MasterCard</div>
                <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium">PayPal</div>
                <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium">Amex</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
