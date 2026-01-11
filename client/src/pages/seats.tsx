import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plane, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Seats() {
  const [, setLocation] = useLocation();
  const { currentBooking, setSeats } = useStore();
  const { toast } = useToast();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(currentBooking.seats);

  if (!currentBooking.flight) {
    setLocation('/');
    return null;
  }

  const flight = currentBooking.flight;
  const seatClass = currentBooking.seatClass;
  const requiredSeats = currentBooking.passengers.length;
  const isBusiness = seatClass === 'business';

  const businessRows = 4;
  const economyRows = 25;
  const seatsPerRow = isBusiness ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E', 'F'];

  const generateSeats = () => {
    const seats: { id: string; row: number; seat: string; isOccupied: boolean; isBusiness: boolean }[] = [];
    
    for (let row = 1; row <= businessRows; row++) {
      ['A', 'B', 'C', 'D'].forEach((seat) => {
        const id = `${row}${seat}`;
        seats.push({
          id,
          row,
          seat,
          isOccupied: flight.occupiedSeats.includes(id),
          isBusiness: true,
        });
      });
    }

    for (let row = businessRows + 1; row <= businessRows + economyRows; row++) {
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach((seat) => {
        const id = `${row}${seat}`;
        seats.push({
          id,
          row,
          seat,
          isOccupied: flight.occupiedSeats.includes(id),
          isBusiness: false,
        });
      });
    }

    return seats;
  };

  const allSeats = generateSeats();
  const displaySeats = isBusiness 
    ? allSeats.filter((s) => s.isBusiness)
    : allSeats.filter((s) => !s.isBusiness);

  const toggleSeat = (seatId: string, isOccupied: boolean) => {
    if (isOccupied) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else if (selectedSeats.length < requiredSeats) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      toast({
        title: 'Maximum seats selected',
        description: `You can only select ${requiredSeats} seat${requiredSeats > 1 ? 's' : ''}`,
        variant: 'destructive',
      });
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length !== requiredSeats) {
      toast({
        title: 'Select all seats',
        description: `Please select ${requiredSeats} seat${requiredSeats > 1 ? 's' : ''}`,
        variant: 'destructive',
      });
      return;
    }
    setSeats(selectedSeats);
    setLocation('/booking/payment');
  };

  const price = isBusiness ? flight.businessPrice : flight.economyPrice;
  const totalPrice = price * requiredSeats;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation('/booking/passengers')}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Passengers
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1 h-1 bg-primary rounded" />
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1 h-1 bg-muted rounded" />
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
              3
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
          <p className="text-muted-foreground mb-8">
            Choose {requiredSeats} {seatClass} class seat{requiredSeats > 1 ? 's' : ''} for your flight
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-primary" />
                      {flight.flightNumber} - {seatClass === 'business' ? 'Business' : 'Economy'} Class
                    </CardTitle>
                    <CardDescription>
                      {flight.from} → {flight.to}
                    </CardDescription>
                  </div>
                  <Badge variant={isBusiness ? 'default' : 'secondary'} className={isBusiness ? 'bg-amber-500' : ''}>
                    {seatClass === 'business' ? 'Business' : 'Economy'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-8 mb-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-8 h-8 rounded', isBusiness ? 'seat-business' : 'seat-available')} />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn('w-8 h-8 rounded', isBusiness ? 'seat-business-selected' : 'seat-selected')} />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded seat-occupied" />
                    <span>Occupied</span>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-t-3xl p-8 mx-auto max-w-md">
                  <div className="bg-gray-300 rounded-t-full w-20 h-10 mx-auto mb-8 flex items-center justify-center text-xs text-gray-600">
                    Cockpit
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: isBusiness ? businessRows : economyRows }).map((_, rowIndex) => {
                      const row = isBusiness ? rowIndex + 1 : rowIndex + businessRows + 1;
                      const rowSeats = displaySeats.filter((s) => s.row === row);
                      const leftSeats = isBusiness ? rowSeats.slice(0, 2) : rowSeats.slice(0, 3);
                      const rightSeats = isBusiness ? rowSeats.slice(2) : rowSeats.slice(3);

                      return (
                        <motion.div
                          key={row}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: rowIndex * 0.02 }}
                          className="flex items-center justify-center gap-4"
                        >
                          <div className="flex gap-1">
                            {leftSeats.map((seat) => (
                              <button
                                key={seat.id}
                                onClick={() => toggleSeat(seat.id, seat.isOccupied)}
                                disabled={seat.isOccupied}
                                className={cn(
                                  'w-10 h-10 rounded-lg text-xs font-medium transition-all flex items-center justify-center',
                                  seat.isOccupied && 'seat-occupied',
                                  !seat.isOccupied && !selectedSeats.includes(seat.id) && (isBusiness ? 'seat-business' : 'seat-available'),
                                  selectedSeats.includes(seat.id) && (isBusiness ? 'seat-business-selected' : 'seat-selected')
                                )}
                                data-testid={`seat-${seat.id}`}
                              >
                                {seat.id}
                              </button>
                            ))}
                          </div>

                          <div className="w-12 text-center text-sm text-gray-500 font-medium">
                            {row}
                          </div>

                          <div className="flex gap-1">
                            {rightSeats.map((seat) => (
                              <button
                                key={seat.id}
                                onClick={() => toggleSeat(seat.id, seat.isOccupied)}
                                disabled={seat.isOccupied}
                                className={cn(
                                  'w-10 h-10 rounded-lg text-xs font-medium transition-all flex items-center justify-center',
                                  seat.isOccupied && 'seat-occupied',
                                  !seat.isOccupied && !selectedSeats.includes(seat.id) && (isBusiness ? 'seat-business' : 'seat-available'),
                                  selectedSeats.includes(seat.id) && (isBusiness ? 'seat-business-selected' : 'seat-selected')
                                )}
                                data-testid={`seat-${seat.id}`}
                              >
                                {seat.id}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {!isBusiness && (
                    <div className="flex justify-between mt-4 px-4 text-xs text-gray-500">
                      <span>Window</span>
                      <span>Aisle</span>
                      <span>Aisle</span>
                      <span>Window</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Flight</span>
                    <span className="font-medium">{flight.flightNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium">{flight.from} → {flight.to}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Class</span>
                    <Badge variant={isBusiness ? 'default' : 'secondary'} className={isBusiness ? 'bg-amber-500' : ''}>
                      {seatClass}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="font-medium">{requiredSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per seat</span>
                    <span className="font-medium">${price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Selected Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map((seat) => (
                        <Badge key={seat} variant="outline" className="text-sm">
                          {seat}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No seats selected</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedSeats.length} of {requiredSeats} selected
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleContinue}
                    disabled={selectedSeats.length !== requiredSeats}
                    data-testid="button-continue"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
