import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Check, Loader2, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19),
  cardName: z.string().min(3, 'Name on card is required'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be 3-4 digits').max(4),
});

export default function Payment() {
  const [, setLocation] = useLocation();
  const { currentBooking, confirmBooking, airlines, airports } = useStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  if (!currentBooking.flight || currentBooking.seats.length === 0) {
    setLocation('/');
    return null;
  }

  const flight = currentBooking.flight;
  const seatClass = currentBooking.seatClass;
  const isBusiness = seatClass === 'business';
  const price = isBusiness ? flight.businessPrice : flight.economyPrice;
  const totalPrice = price * currentBooking.passengers.length;
  const airline = airlines.find((a) => a.id === flight.airlineId);
  const fromAirport = airports.find((a) => a.code === flight.from);
  const toAirport = airports.find((a) => a.code === flight.to);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const onSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtp(true);
      toast({
        title: 'OTP Sent',
        description: `Verification code sent to ${currentBooking.passengers[0].email}. (Demo OTP: ${generatedOtp})`,
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setIsProcessing(true);
      setTimeout(() => {
        const booking = confirmBooking();
        if (booking) {
          setLocation(`/booking/confirmation/${booking.id}`);
        }
      }, 2000);
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the correct verification code',
        variant: 'destructive',
      });
    }
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
            onClick={() => setLocation('/booking/seats')}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seats
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground mb-8">
            Complete your booking by entering your payment details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Card Details
                </CardTitle>
                <CardDescription>
                  Your payment is secured with 256-bit SSL encryption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                placeholder="4242 4242 4242 4242"
                                className="pl-12 text-lg tracking-wider"
                                data-testid="input-card-number"
                                {...field}
                                onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                                maxLength={19}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="JOHN DOE"
                              className="uppercase"
                              data-testid="input-card-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MM/YY"
                                data-testid="input-expiry"
                                {...field}
                                maxLength={5}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, '');
                                  if (value.length >= 2) {
                                    value = value.substring(0, 2) + '/' + value.substring(2);
                                  }
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="•••"
                                  data-testid="input-cvv"
                                  {...field}
                                  maxLength={4}
                                />
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">Your payment information is encrypted and secure</span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isProcessing}
                      data-testid="button-pay"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ${totalPrice}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{airline?.logo}</div>
                    <div>
                      <p className="font-semibold">{airline?.name}</p>
                      <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-bold text-lg">{flight.departureTime}</p>
                      <p className="text-muted-foreground">{fromAirport?.city}</p>
                    </div>
                    <div className="text-center px-4">→</div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{flight.arrivalTime}</p>
                      <p className="text-muted-foreground">{toAirport?.city}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {new Date(flight.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Class</span>
                    <Badge variant={isBusiness ? 'default' : 'secondary'} className={isBusiness ? 'bg-amber-500' : ''}>
                      {seatClass}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="font-medium">{currentBooking.seats.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">{currentBooking.passengers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per seat</span>
                    <span className="font-medium">${price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showOtp} onOpenChange={setShowOtp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Verify Your Payment
            </DialogTitle>
            <DialogDescription>
              We've sent a 6-digit verification code to {currentBooking.passengers[0]?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              data-testid="input-otp"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Demo OTP: <span className="font-mono font-bold text-primary">{generatedOtp}</span>
            </p>
            <Button
              onClick={handleVerifyOtp}
              className="w-full"
              disabled={otp.length !== 6 || isProcessing}
              data-testid="button-verify-otp"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Completing Booking...
                </>
              ) : (
                'Verify & Complete Booking'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
