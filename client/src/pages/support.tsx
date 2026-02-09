import { motion } from 'framer-motion';
import { Headphones, MessageCircle, Phone, Mail, FileText, Search, ChevronDown, CheckCircle, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I check my flight status?',
    answer: 'You can check your flight status by entering your PNR or booking ID in the "Manage Booking" section on our homepage or by contacting our 24/7 support line.'
  },
  {
    question: 'What is the refund policy for cancellations?',
    answer: 'Refund policies vary by airline and ticket class. Generally, if you cancel within 24 hours of booking, you may be eligible for a full refund. Otherwise, cancellation fees apply.'
  },
  {
    question: 'How much baggage can I carry?',
    answer: 'Baggage allowance depends on your airline and ticket type. Economy class usually includes 15-20kg check-in and 7kg hand luggage. Check your booking details for specifics.'
  },
  {
    question: 'Can I change my flight date after booking?',
    answer: 'Yes, most bookings allow date changes, though airlines may charge a change fee plus any difference in airfare.'
  }
];

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1920" 
            alt="Customer Support" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-[1px]" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6"
          >
            <Headphones className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Help Center</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            How can we <span className="text-blue-400">help?</span>
          </motion.h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search for topics, flights, or help articles..." 
              className="h-16 pl-14 pr-6 rounded-full bg-white/90 border-0 shadow-2xl text-gray-900 text-lg placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: MessageCircle, title: 'Live Chat', desc: 'Average response time: 2 mins', color: 'bg-green-500' },
            { icon: Phone, title: 'Call Center', desc: '+1 (800) SKY-BOOK (24/7)', color: 'bg-blue-500' },
            { icon: Mail, title: 'Email Support', desc: 'support@skybook.com', color: 'bg-purple-500' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 border-none bg-white p-4">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-${item.color.split('-')[1]}-200`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Quick answers to the most common questions from our travelers.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border-none shadow-sm px-6">
              <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Features Support */}
      <section className="py-24 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Secure Payments</h4>
                <p className="text-sm text-muted-foreground">Encryption ensures your data stays private and safe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Verified Airlines</h4>
                <p className="text-sm text-muted-foreground">We only partner with trusted, top-rated airlines.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Global Access</h4>
                <p className="text-sm text-muted-foreground">Support teams available in 15+ languages.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-purple-400 shrink-0" />
              <div>
                <h4 className="font-bold mb-2">Clear Policies</h4>
                <p className="text-sm text-muted-foreground">No hidden fees or confusing fine print.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
