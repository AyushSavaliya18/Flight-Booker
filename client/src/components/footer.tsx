import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {

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
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Home</Link></li>
              <li><Link href="/flights" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Search Flights</Link></li>
              <li><Link href="/deals" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Deals & Offers</Link></li>
              <li><Link href="/my-bookings" className="text-slate-400 hover:text-white transition-colors cursor-pointer">My Bookings</Link></li>
              <li><Link href="/travel-guide" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Travel Guide</Link></li>
              <li><Link href="/flight-status" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Flight Status</Link></li>
              <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help-center" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Help Center</Link></li>
              <li><Link href="/faqs" className="text-slate-400 hover:text-white transition-colors cursor-pointer">FAQs</Link></li>
              <li><Link href="/cancellation-policy" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Cancellation Policy</Link></li>
              <li><Link href="/refund-policy" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Refund Policy</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms of Service</Link></li>
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
