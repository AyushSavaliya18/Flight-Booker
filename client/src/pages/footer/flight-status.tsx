import { motion } from 'framer-motion';
import { Search, Plane, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FlightStatus() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Flight Status</h1>
            <p className="text-slate-400 text-lg">Real-time updates on your flight's progress and schedule.</p>
            
            <div className="mt-8 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder="Enter Flight Number (e.g. AI101)" 
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl"
                />
              </div>
              <Button size="lg" className="h-14 px-8 rounded-xl">Check Status</Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 hidden lg:block">
           <img src="/src/assets/images/flight-status-hero.jpg" className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="dark:bg-slate-900 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="font-bold dark:text-white">On Time</h3>
              </div>
              <p className="text-muted-foreground">Most flights are operating according to their original schedule.</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-slate-900 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="text-amber-600 w-6 h-6" />
                </div>
                <h3 className="font-bold dark:text-white">Minor Delays</h3>
              </div>
              <p className="text-muted-foreground">Expect small delays for flights departing from DEL and BOM airports.</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <AlertCircle className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="font-bold dark:text-white">Weather Notice</h3>
              </div>
              <p className="text-muted-foreground">Check status frequently if traveling through Northern India due to fog.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
