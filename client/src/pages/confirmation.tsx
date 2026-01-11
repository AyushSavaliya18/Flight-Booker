import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Check, Plane, Download, Mail, Calendar, Clock, MapPin, User, QrCode, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';

export default function Confirmation() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { bookings, flights, airlines, airports } = useStore();

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <Button onClick={() => setLocation('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const flight = flights.find((f) => f.id === booking.flightId);
  const airline = airlines.find((a) => a.id === flight?.airlineId);
  const fromAirport = airports.find((a) => a.code === flight?.from);
  const toAirport = airports.find((a) => a.code === flight?.to);

  if (!flight) {
    return null;
  }

  const isBusiness = booking.seatClass === 'business';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Your flight has been booked successfully
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-100 border border-green-200 rounded-xl p-4 mb-8 flex items-center gap-4"
        >
          <Mail className="w-6 h-6 text-green-700" />
          <div>
            <p className="font-medium text-green-800">Confirmation email sent</p>
            <p className="text-sm text-green-700">
              We've sent your e-ticket and boarding pass to {booking.passengers[0].email}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden mb-8 print:shadow-none">
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{airline?.logo}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{airline?.name}</h2>
                    <p className="text-blue-100">{flight.flightNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Booking Reference</p>
                  <p className="text-3xl font-mono font-bold tracking-wider">{booking.pnr}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold">{flight.departureTime}</p>
                  <p className="text-xl font-semibold">{flight.from}</p>
                  <p className="text-muted-foreground">{fromAirport?.city}</p>
                  <p className="text-sm text-muted-foreground">{fromAirport?.name}</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(flight.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-primary" />
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-blue-300 to-primary relative">
                      <Plane className="absolute left-1/2 -translate-x-1/2 -top-2.5 w-5 h-5 text-primary" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Direct Flight</p>
                </div>

                <div className="text-center">
                  <p className="text-4xl font-bold">{flight.arrivalTime}</p>
                  <p className="text-xl font-semibold">{flight.to}</p>
                  <p className="text-muted-foreground">{toAirport?.city}</p>
                  <p className="text-sm text-muted-foreground">{toAirport?.name}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Class</p>
                  <Badge variant={isBusiness ? 'default' : 'secondary'} className={isBusiness ? 'bg-amber-500' : ''}>
                    {booking.seatClass}
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Seats</p>
                  <p className="font-bold">{booking.seats.join(', ')}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Passengers</p>
                  <p className="font-bold">{booking.passengers.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Paid</p>
                  <p className="font-bold text-primary">${booking.totalPrice}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Passengers
              </h3>
              <div className="space-y-4">
                {booking.passengers.map((passenger, index) => (
                  <div key={index} className="p-4 rounded-lg border flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Passport: {passenger.passportNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Seat {booking.seats[index]}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {booking.passengers.map((passenger, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="mb-4 overflow-hidden print:break-inside-avoid">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6" />
                    <span className="font-semibold">BOARDING PASS</span>
                  </div>
                  <span className="text-sm">E-Ticket</span>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="md:col-span-3 p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Passenger Name</p>
                        <p className="text-xl font-bold uppercase">
                          {passenger.lastName}/{passenger.firstName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Flight</p>
                        <p className="text-xl font-bold">{flight.flightNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">From</p>
                        <p className="text-2xl font-bold">{flight.from}</p>
                        <p className="text-xs text-muted-foreground">{fromAirport?.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">To</p>
                        <p className="text-2xl font-bold">{flight.to}</p>
                        <p className="text-xs text-muted-foreground">{toAirport?.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                        <p className="font-bold">
                          {new Date(flight.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Boarding</p>
                        <p className="font-bold">{flight.departureTime}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dashed">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Seat</p>
                        <p className="text-3xl font-bold text-primary">{booking.seats[index]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Class</p>
                        <p className="font-bold uppercase">{booking.seatClass}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Gate</p>
                        <p className="font-bold">B{Math.floor(Math.random() * 20) + 1}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 bg-gray-50 p-6 flex flex-col items-center justify-center border-l border-dashed">
                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 shadow-inner">
                      <QrCode className="w-24 h-24 text-gray-800" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Scan at airport
                    </p>
                    <p className="font-mono font-bold mt-2">{booking.pnr}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-8 print:hidden"
        >
          <Button size="lg" onClick={handlePrint} data-testid="button-print">
            <Printer className="w-4 h-4 mr-2" />
            Print Boarding Pass
          </Button>
          <Button size="lg" variant="outline" onClick={() => setLocation('/')} data-testid="button-home">
            Book Another Flight
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
