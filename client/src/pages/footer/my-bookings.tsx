import { motion } from 'framer-motion';
import { Ticket, History, Calendar, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MyBookings() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 dark:text-white">My Bookings</h1>
            <p className="text-muted-foreground text-lg">Manage your trips and view travel history.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-xl">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button className="rounded-xl">
              Upcoming Trips
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="dark:bg-slate-900 border-dashed border-2 bg-transparent">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                    <Ticket className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">No Upcoming Trips</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    Looks like you haven't booked any flights yet. Start your next adventure today!
                  </p>
                  <Button size="lg" className="rounded-xl px-8" onClick={() => window.location.href = '/'}>
                    Find a Flight
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <Card className="dark:bg-slate-900 border-none shadow-md overflow-hidden">
               <img src="/src/assets/images/my-bookings-hero.jpg" className="w-full h-48 object-cover" />
               <CardContent className="p-6">
                 <h4 className="font-bold mb-4 dark:text-white">Booking Support</h4>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 text-sm">
                     <Calendar className="w-4 h-4 text-primary" />
                     <span className="dark:text-slate-300">Change Flight Date</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm">
                     <Settings className="w-4 h-4 text-primary" />
                     <span className="dark:text-slate-300">Request Special Assistance</span>
                   </div>
                 </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
