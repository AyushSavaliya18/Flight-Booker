import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, Search, ArrowRight, Shield, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/lib/store';

export default function Home() {
  const [, setLocation] = useLocation();
  const { airports } = useStore();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const handleSearch = () => {
    if (from && to && date) {
      setLocation(`/flights?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-100/50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Discover the world with SkyBook
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Book Your Next
              <span className="text-gradient block">Adventure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search hundreds of airlines and find the best deals on flights worldwide. 
              Your journey starts here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-1">
                  <Label className="text-sm font-medium mb-2 block text-muted-foreground">From</Label>
                  <Select value={from} onValueChange={setFrom}>
                    <SelectTrigger data-testid="select-from" className="h-14 bg-white border-0 shadow-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <SelectValue placeholder="Departure city" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.id} value={airport.code}>
                          {airport.city} ({airport.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-1">
                  <Label className="text-sm font-medium mb-2 block text-muted-foreground">To</Label>
                  <Select value={to} onValueChange={setTo}>
                    <SelectTrigger data-testid="select-to" className="h-14 bg-white border-0 shadow-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <SelectValue placeholder="Arrival city" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {airports.filter((a) => a.code !== from).map((airport) => (
                        <SelectItem key={airport.id} value={airport.code}>
                          {airport.city} ({airport.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-1">
                  <Label className="text-sm font-medium mb-2 block text-muted-foreground">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary z-10" />
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-14 pl-10 bg-white border-0 shadow-sm"
                      data-testid="input-date"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <Label className="text-sm font-medium mb-2 block text-muted-foreground">Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger data-testid="select-passengers" className="h-14 bg-white border-0 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} {n === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-1 flex items-end">
                  <Button
                    onClick={handleSearch}
                    disabled={!from || !to || !date}
                    className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all"
                    data-testid="button-search"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose SkyBook?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make booking flights simple, secure, and stress-free
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Your payment and personal information are protected with bank-level security.',
              },
              {
                icon: Clock,
                title: 'Instant Confirmation',
                description: 'Get your boarding pass and booking confirmation immediately after payment.',
              },
              {
                icon: Plane,
                title: 'Best Prices',
                description: 'Compare prices across hundreds of airlines to find the best deals.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Fly?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey today and explore destinations around the world
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-xl"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-testid="button-book-now"
            >
              Book Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
