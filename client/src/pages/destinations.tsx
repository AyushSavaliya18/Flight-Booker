import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star, Plane, Shield, Clock, Badge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const allDestinations = [
  { 
    city: 'Paris', 
    country: 'France', 
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', 
    price: 599, 
    discount: 15,
    description: 'The city of light, romance, and iconic landmarks like the Eiffel Tower.',
    rating: 4.8
  },
  { 
    city: 'Tokyo', 
    country: 'Japan', 
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 
    price: 899, 
    discount: 20,
    description: 'A neon-lit metropolis blending ancient traditions with futuristic technology.',
    rating: 4.9
  },
  { 
    city: 'Dubai', 
    country: 'UAE', 
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', 
    price: 649, 
    discount: 10,
    description: 'Home to the world\'s tallest building and luxury shopping experiences.',
    rating: 4.7
  },
  { 
    city: 'New York', 
    country: 'USA', 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', 
    price: 449, 
    discount: 25,
    description: 'The city that never sleeps, filled with culture, art, and Broadway magic.',
    rating: 4.6
  },
  { 
    city: 'Sydney', 
    country: 'Australia', 
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800', 
    price: 1099, 
    discount: 15,
    description: 'Famous for its stunning harbor, Opera House, and beautiful beaches.',
    rating: 4.8
  },
  { 
    city: 'London', 
    country: 'UK', 
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', 
    price: 549, 
    discount: 12,
    description: 'History, royalty, and modern culture in one of the world\'s most vibrant cities.',
    rating: 4.7
  },
  { 
    city: 'Santorini', 
    country: 'Greece', 
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 
    price: 749, 
    discount: 18,
    description: 'Breathtaking sunsets and white-washed buildings overlooking the Aegean Sea.',
    rating: 4.9
  },
  { 
    city: 'Bali', 
    country: 'Indonesia', 
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 
    price: 499, 
    discount: 30,
    description: 'Tropical paradise known for its lush forests, temples, and serene retreats.',
    rating: 4.8
  },
  { 
    city: 'Rome', 
    country: 'Italy', 
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', 
    price: 599, 
    discount: 22,
    description: 'The Eternal City, home to ancient ruins and incredible Italian cuisine.',
    rating: 4.7
  }
];

export default function Destinations() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920" 
            alt="World Travel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Explore the World
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Discover exclusive flight deals to the most beautiful places on Earth.
          </motion.p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((dest, index) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none bg-white">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {dest.discount}% OFF
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{dest.rating} Rating</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{dest.city}</h3>
                    <div className="flex items-center gap-2 text-gray-200">
                      <MapPin className="w-4 h-4" />
                      <span>{dest.country}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between border-t pt-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Flights starting at</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-primary">
                          ${Math.round(dest.price * (1 - dest.discount / 100))}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">${dest.price}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setLocation('/')}
                      className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                      Find Flights
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">100% Secure</h3>
              <p className="text-muted-foreground">Your bookings are protected by bank-level encryption.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Instant Confirmation</h3>
              <p className="text-muted-foreground">Receive your tickets immediately after booking.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">Top Rated Service</h3>
              <p className="text-muted-foreground">Over 10 million happy travelers trust SkyBook.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
