import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, Search, ArrowRight, Shield, Clock, Sparkles, Star, Baby, User, Percent, Globe, Headphones, CreditCard, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

const destinations = [
  { city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600', price: 599, discount: 15 },
  { city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600', price: 899, discount: 20 },
  { city: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', price: 649, discount: 10 },
  { city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600', price: 449, discount: 25 },
  { city: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600', price: 1099, discount: 15 },
  { city: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600', price: 549, discount: 12 },
];

const reviews = [
  { name: 'Sarah Johnson', location: 'New York, USA', rating: 5, review: 'Amazing experience! Booked my family trip to Paris and the whole process was seamless. Great prices and excellent customer service.', avatar: 'SJ' },
  { name: 'Michael Chen', location: 'Singapore', rating: 5, review: 'The child discount feature saved us so much money. Highly recommend SkyBook for family travel. Will definitely use again!', avatar: 'MC' },
  { name: 'Emma Williams', location: 'London, UK', rating: 5, review: 'Best flight booking platform I have ever used. The seat selection was so easy and the boarding pass came instantly.', avatar: 'EW' },
  { name: 'David Kumar', location: 'Mumbai, India', rating: 5, review: 'Excellent deals and the OTP verification made me feel secure. Booked 3 trips already this year through SkyBook!', avatar: 'DK' },
];

const airlines = [
  { name: 'Emirates', logo: '🇦🇪' },
  { name: 'Singapore Airlines', logo: '🇸🇬' },
  { name: 'Qatar Airways', logo: '🇶🇦' },
  { name: 'Lufthansa', logo: '🇩🇪' },
  { name: 'British Airways', logo: '🇬🇧' },
  { name: 'Air France', logo: '🇫🇷' },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { airports } = useStore();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');

  const handleSearch = () => {
    if (from && to && date) {
      const totalPassengers = parseInt(adults) + parseInt(children);
      setLocation(`/flights?from=${from}&to=${to}&date=${date}&passengers=${totalPassengers}&adults=${adults}&children=${children}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920"
            alt="Airplane flying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Up to 25% off on first booking
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 block">
                  Dream Destination
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Book flights to 500+ destinations worldwide. Special discounts for children and families. Your adventure starts here.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Baby className="w-5 h-5 text-green-400" />
                  </div>
                  <span>50% off for children</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Secure booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>Instant confirmation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Search Flights
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-muted-foreground">From</Label>
                      <Select value={from} onValueChange={setFrom}>
                        <SelectTrigger data-testid="select-from" className="h-12 bg-white border-0 shadow-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <SelectValue placeholder="Departure" />
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
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-muted-foreground">To</Label>
                      <Select value={to} onValueChange={setTo}>
                        <SelectTrigger data-testid="select-to" className="h-12 bg-white border-0 shadow-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <SelectValue placeholder="Arrival" />
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
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-muted-foreground">Travel Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary z-10" />
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-12 pl-10 bg-white border-0 shadow-sm"
                        data-testid="input-date"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-muted-foreground">
                        <User className="w-3 h-3 inline mr-1" />
                        Adults (12+)
                      </Label>
                      <Select value={adults} onValueChange={setAdults}>
                        <SelectTrigger data-testid="select-adults" className="h-12 bg-white border-0 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SelectItem key={n} value={n.toString()}>{n} Adult{n > 1 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-muted-foreground">
                        <Baby className="w-3 h-3 inline mr-1" />
                        Children (2-11)
                        <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">50% OFF</Badge>
                      </Label>
                      <Select value={children} onValueChange={setChildren}>
                        <SelectTrigger data-testid="select-children" className="h-12 bg-white border-0 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((n) => (
                            <SelectItem key={n} value={n.toString()}>{n} Child{n !== 1 ? 'ren' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={!from || !to || !date}
                    className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all"
                    data-testid="button-search"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Airlines */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Trusted by millions. Partnered with world-class airlines.</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {airlines.map((airline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-600"
              >
                <span className="text-2xl">{airline.logo}</span>
                <span className="font-medium">{airline.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Why SkyBook</Badge>
            <h2 className="text-4xl font-bold mb-4">The Best Way to Book Flights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience seamless booking with features designed for modern travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Secure Booking', description: 'Bank-level encryption protects your data', color: 'bg-blue-500' },
              { icon: Clock, title: 'Instant Confirmation', description: 'Get your boarding pass immediately', color: 'bg-green-500' },
              { icon: Percent, title: 'Best Price Guarantee', description: 'Find a lower price? We match it', color: 'bg-orange-500' },
              { icon: Headphones, title: '24/7 Support', description: 'We are here whenever you need us', color: 'bg-purple-500' },
              { icon: Baby, title: 'Family Discounts', description: '50% off for children ages 2-11', color: 'bg-pink-500' },
              { icon: Globe, title: '500+ Destinations', description: 'Fly anywhere in the world', color: 'bg-cyan-500' },
              { icon: CreditCard, title: 'Flexible Payment', description: 'Multiple payment options available', color: 'bg-indigo-500' },
              { icon: Plane, title: 'Easy Seat Selection', description: 'Choose your preferred seat', color: 'bg-rose-500' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <Badge className="mb-4">Popular Destinations</Badge>
              <h2 className="text-4xl font-bold mb-2">Explore Top Destinations</h2>
              <p className="text-muted-foreground">Discover amazing places with exclusive deals</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" data-testid="button-view-all">
              View All Destinations
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300" data-testid={`card-destination-${index}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.city}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500">{dest.discount}% OFF</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{dest.city}</h3>
                      <p className="text-gray-200">{dest.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">${Math.round(dest.price * (1 - dest.discount / 100))}</span>
                          <span className="text-sm text-muted-foreground line-through">${dest.price}</span>
                        </div>
                      </div>
                      <Button size="sm">
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-white/20 text-white mb-4">Special Offer</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Family Travel Made Affordable</h2>
              <p className="text-xl text-blue-100 mb-8">
                Get 50% off on tickets for children aged 2-11. Plus, earn reward points on every booking!
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 rounded-xl p-4">
                  <Baby className="w-8 h-8 mb-2" />
                  <p className="font-bold text-2xl">50%</p>
                  <p className="text-blue-200 text-sm">Child Discount</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <Percent className="w-8 h-8 mb-2" />
                  <p className="font-bold text-2xl">25%</p>
                  <p className="text-blue-200 text-sm">First Booking</p>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-book-family">
                Book Family Trip
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                  alt="Family travel"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover max-h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-foreground rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Baby className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold">Kids Fly Half Price!</p>
                      <p className="text-sm text-muted-foreground">Ages 2-11</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of happy travelers who book with SkyBook
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full" data-testid={`card-review-${index}`}>
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground mb-6">{review.review}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5M+', label: 'Happy Travelers' },
              { value: '500+', label: 'Destinations' },
              { value: '100+', label: 'Airlines' },
              { value: '4.9', label: 'User Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Sign up today and get 10% off your first booking. Join millions of travelers worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl" onClick={() => setLocation('/signup')} data-testid="button-signup">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-gray-600 text-white hover:bg-white/10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Search Flights
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
