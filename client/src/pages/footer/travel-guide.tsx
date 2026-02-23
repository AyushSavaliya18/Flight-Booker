import { motion } from 'framer-motion';
import { MapPin, BookOpen, Compass, Sun, Umbrella } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TravelGuide() {
  const guides = [
    { title: "Europe Summer Guide", desc: "Best coastal cities to visit in 2026", icon: Sun, color: "text-orange-500" },
    { title: "Hidden Gems of Asia", desc: "Untouched islands and mountain retreats", icon: Compass, color: "text-emerald-500" },
    { title: "Packing Essentials", desc: "What to carry for your next big adventure", icon: Umbrella, color: "text-blue-500" },
    { title: "Local Etiquette", desc: "Cultural tips for international travelers", icon: BookOpen, color: "text-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="/src/assets/images/travel-guide-hero.jpg" 
          className="w-full h-full object-cover"
          alt="Travel Guide"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold mb-4"
            >
              Travel Inspiration
            </motion.h1>
            <p className="text-xl text-gray-200">Expert guides for your next journey</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all dark:bg-slate-900 border-none shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 ${guide.color}`}>
                    <guide.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{guide.title}</h3>
                  <p className="text-muted-foreground">{guide.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
