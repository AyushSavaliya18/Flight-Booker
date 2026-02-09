import { motion } from 'framer-motion';
import { Tag, Percent, Clock, ArrowRight, Gift, Sparkles, Zap, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';

const deals = [
  {
    title: 'First Booking Special',
    description: 'Get an instant discount on your first flight booking with SkyBook.',
    discount: '25% OFF',
    code: 'FIRSTFLY25',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    expiry: 'Valid for 30 days',
    type: 'Limited Time'
  },
  {
    title: 'Family Summer Deal',
    description: 'Special rates for families traveling with 2 or more children.',
    discount: '15% EXTRA',
    code: 'FAMILYFUN',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    expiry: 'Expires Aug 31',
    type: 'Seasonal'
  },
  {
    title: 'Weekend Getaway',
    description: 'Book your weekend trip 48 hours in advance for massive savings.',
    discount: 'UP TO 40%',
    code: 'WEEKEND48',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    expiry: 'Ends in 2 days',
    type: 'Flash Sale'
  },
  {
    title: 'Business Class Upgrade',
    description: 'Upgrade your economy seat to business at a fraction of the cost.',
    discount: '$99 STARTING',
    code: 'UPGRADEBIZ',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800',
    expiry: 'Select Routes Only',
    type: 'Upgrade'
  }
];

export default function Deals() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=1920" 
            alt="Exciting Deals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6"
          >
            <Gift className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Exclusive Offers</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Incredible <span className="text-blue-400">Deals</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Don't miss out on these limited-time offers. Travel more, spend less.
          </motion.p>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white border-none px-3 py-1">
                        {deal.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-primary font-bold mb-2">
                        <Tag className="w-4 h-4" />
                        {deal.discount}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{deal.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {deal.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-dashed border-gray-300">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Code</span>
                        <span className="text-lg font-black text-primary font-mono">{deal.code}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {deal.expiry}
                        </div>
                        <Button onClick={() => setLocation('/')} size="sm" className="rounded-full">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Want personalized deals?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive flight offers delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button variant="secondary" className="rounded-full px-8">Join Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
