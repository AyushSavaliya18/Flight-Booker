import { motion } from 'framer-motion';
import { HelpCircle, Book, MessageSquare, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="relative h-[300px]">
        <img src="/src/assets/images/help-center-hero.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">How can we help?</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: HelpCircle, title: 'FAQs', desc: 'Find quick answers' },
            { icon: Book, title: 'Guides', desc: 'Learn how to book' },
            { icon: MessageSquare, title: 'Chat', desc: 'Talk to an agent' },
            { icon: Phone, title: 'Call', desc: '24/7 Support line' }
          ].map((item, i) => (
            <Card key={i} className="dark:bg-slate-900 border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
