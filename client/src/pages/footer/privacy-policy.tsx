import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PolicyContent {
  title: string;
  icon: any;
  sections: { subtitle: string; content: string }[];
}

const policies: Record<string, PolicyContent> = {
  "Cancellation Policy": {
    title: "Cancellation Policy",
    icon: FileText,
    sections: [
      { subtitle: "Domestic Flights", content: "Cancellations made more than 24 hours before departure are eligible for a partial refund minus airline fees and a small service charge. Changes within 24 hours may not be eligible for refunds." },
      { subtitle: "International Flights", content: "International cancellations are subject to specific airline policies. Generally, requests must be made at least 48 hours in advance." },
      { subtitle: "Non-Refundable Tickets", content: "Basic economy and certain promotional fares are non-refundable. However, you may receive travel credit for future bookings." }
    ]
  },
  "Refund Policy": {
    title: "Refund Policy",
    icon: CheckCircle2,
    sections: [
      { subtitle: "Processing Time", content: "Refunds are typically processed within 7-10 business days after approval. The amount will be credited back to the original payment method." },
      { subtitle: "Ancillary Services", content: "Fees for seat selection, extra baggage, and priority boarding are generally non-refundable unless the flight is cancelled by the airline." },
      { subtitle: "Partial Refunds", content: "If you have used a portion of your ticket, the refund will be calculated based on the unused segment, subject to airline rules." }
    ]
  },
  "Privacy Policy": {
    title: "Privacy Policy",
    icon: Lock,
    sections: [
      { subtitle: "Data Collection", content: "We collect personal information such as name, contact details, and payment info solely to facilitate your travel bookings and improve our services." },
      { subtitle: "Information Sharing", content: "Your data is shared only with necessary travel partners (airlines, hotels) and service providers required to complete your booking." },
      { subtitle: "Security Measures", content: "We use industry-standard encryption and security protocols to protect your personal and financial information from unauthorized access." }
    ]
  },
  "Terms of Service": {
    title: "Terms of Service",
    icon: Shield,
    sections: [
      { subtitle: "User Responsibilities", content: "Users must provide accurate information and are responsible for maintaining the confidentiality of their account credentials." },
      { subtitle: "Booking Accuracy", content: "It is the traveler's responsibility to verify all flight details, including dates, times, and passenger names, before completing a purchase." },
      { subtitle: "Limitation of Liability", content: "SkyBook acts as an intermediary between travelers and service providers. We are not liable for delays or cancellations caused by third parties." }
    ]
  }
};

export default function PolicyPage({ title }: { title: string }) {
  const policy = policies[title] || policies["Privacy Policy"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <policy.icon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 dark:text-white">{policy.title}</h1>
          <p className="text-muted-foreground">Effective Date: February 24, 2026</p>
        </motion.div>

        <div className="space-y-8">
          {policy.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="dark:bg-slate-900 border-none shadow-md overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                    <div className="w-2 h-8 bg-primary rounded-full" />
                    {section.subtitle}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-center"
        >
          <h3 className="text-lg font-bold mb-2 dark:text-white">Need further clarification?</h3>
          <p className="text-muted-foreground mb-6">Our support team is available 24/7 to help with any policy-related questions.</p>
          <button 
            onClick={() => window.location.href = '/support'}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
