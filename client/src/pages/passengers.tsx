import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, FileText, Globe, ArrowRight, ArrowLeft, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore, type Passenger } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\-\s]+$/, 'Invalid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  passportNumber: z.string().min(6, 'Passport number must be at least 6 characters'),
  nationality: z.string().min(2, 'Nationality is required'),
});

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 
  'Japan', 'Singapore', 'India', 'China', 'Brazil', 'UAE', 'South Korea', 'Italy',
  'Spain', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark'
];

export default function Passengers() {
  const [, setLocation] = useLocation();
  const { currentBooking, setPassengers } = useStore();
  const { toast } = useToast();

  if (!currentBooking.flight) {
    setLocation('/');
    return null;
  }

  const passengerCount = currentBooking.passengers.length || 1;

  const formSchema = z.object({
    passengers: z.array(passengerSchema).length(passengerCount),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: currentBooking.passengers.length > 0 
        ? currentBooking.passengers 
        : Array(passengerCount).fill({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            passportNumber: '',
            nationality: '',
          }),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setPassengers(data.passengers as Passenger[]);
    toast({
      title: 'Passenger details saved',
      description: 'Proceeding to seat selection...',
    });
    setLocation('/booking/seats');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation('/flights')}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flights
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1 h-1 bg-muted rounded" />
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
              3
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Passenger Details</h1>
          <p className="text-muted-foreground mb-8">
            Please enter the details for all {passengerCount} passenger{passengerCount > 1 ? 's' : ''} as they appear on their passport
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {Array.from({ length: passengerCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Passenger {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.firstName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="John"
                                  className="pl-10"
                                  data-testid={`input-firstname-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.lastName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="Doe"
                                  className="pl-10"
                                  data-testid={`input-lastname-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="pl-10"
                                  data-testid={`input-email-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="+1 234 567 8900"
                                  className="pl-10"
                                  data-testid={`input-phone-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  type="date"
                                  className="pl-10"
                                  data-testid={`input-dob-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.passportNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  placeholder="AB1234567"
                                  className="pl-10"
                                  data-testid={`input-passport-${index}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.nationality`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid={`select-nationality-${index}`}>
                                  <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select country" />
                                  </div>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end"
            >
              <Button type="submit" size="lg" className="px-8" data-testid="button-continue">
                Continue to Seat Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
