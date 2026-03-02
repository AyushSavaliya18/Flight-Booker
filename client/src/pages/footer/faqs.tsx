import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="dark:text-white">How do I book a flight?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">Search on home page by entering your departure, destination, and dates. Select your preferred flight from the results, add passenger details, select your seats, and complete the secure payment process.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="dark:text-white">Can I change my seat after booking?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">Yes, you can manage your seat selection through the 'My Bookings' section up to 24 hours before your scheduled departure, subject to availability and airline policies.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="dark:text-white">How does the 50% child discount work?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">The discount is automatically applied when you select passengers in the 'Children (2-11)' category. The price shown in the final breakdown will reflect the 50% reduction on the base fare for child passengers.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="dark:text-white">What payment methods do you accept?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">We accept all major credit and debit cards (Visa, MasterCard, Amex), as well as popular digital wallets and UPI for seamless transactions in India.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="dark:text-white">How can I check my flight status?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">You can check real-time updates by visiting our 'Flight Status' page and entering your flight number or route details.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="dark:text-white">What should I do if my payment fails?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">If a payment fails but the amount is deducted, don't worry. The refund is usually processed automatically within 5-7 business days. You can also contact our 24/7 support for immediate assistance.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
