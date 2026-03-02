import { motion } from 'framer-motion';
import { HelpCircle, Book, MessageSquare, Phone, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

export default function HelpCenter() {
  const scrollToGuides = () => {
    const element = document.getElementById('detailed-guides');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="relative h-[300px]">
        <img src="/src/assets/images/help-center-hero.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            How can we help?
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Link href="/faqs">
            <Card className="dark:bg-slate-900 border-none shadow-lg cursor-pointer hover:scale-105 transition-transform group">
              <CardContent className="p-8 text-center">
                <HelpCircle className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-blue-400 transition-colors" />
                <h3 className="font-bold mb-2 dark:text-white">FAQs</h3>
                <p className="text-muted-foreground mb-4">Find quick answers to common questions</p>
                <span className="text-primary text-sm font-bold flex items-center justify-center gap-1">
                  View FAQs <ChevronRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Card 
            className="dark:bg-slate-900 border-none shadow-lg cursor-pointer hover:scale-105 transition-transform group"
            onClick={scrollToGuides}
          >
            <CardContent className="p-8 text-center">
              <Book className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-blue-400 transition-colors" />
              <h3 className="font-bold mb-2 dark:text-white">Guides</h3>
              <p className="text-muted-foreground mb-4">Learn how to book and manage trips</p>
              <span className="text-primary text-sm font-bold flex items-center justify-center gap-1">
                Explore Guides <ChevronRight className="w-4 h-4" />
              </span>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2 dark:text-white">Chat</h3>
              <p className="text-muted-foreground">Talk to our virtual travel assistant</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <Phone className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2 dark:text-white">Call</h3>
              <p className="text-muted-foreground">24/7 International support line</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Guides Section */}
        <div id="detailed-guides" className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 dark:text-white border-l-4 border-primary pl-4">Detailed Travel Guides</h2>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-6 h-6" />
                How to Book Your First Flight
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>1. <strong>Search:</strong> Enter your departure city and destination on the home page.</p>
                <p>2. <strong>Select:</strong> Compare prices and airlines, then click 'Book Now' on your preferred flight.</p>
                <p>3. <strong>Passengers:</strong> Enter traveler names exactly as they appear on government IDs.</p>
                <p>4. <strong>Seats:</strong> Use our interactive seat map to pick your favorite spot.</p>
                <p>5. <strong>Payment:</strong> Complete the transaction using our secure payment gateway.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-6 h-6" />
                Managing Your Bookings
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Access the <strong>'My Bookings'</strong> page to view your itinerary, download your e-ticket, or request changes. Remember that most modifications must be made at least 24 hours before departure.</p>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300 italic">Pro Tip: Always check the 'Refund Policy' before initiating a cancellation to understand potential fees.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
