import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="dark:text-white">How do I book a flight?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">Search on home page, select flight, add passengers, and pay.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="dark:text-white">Can I change my seat?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">Yes, via 'My Bookings' up to 24h before departure.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
