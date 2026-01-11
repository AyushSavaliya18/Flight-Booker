import { useMemo } from 'react';
import { useLocation, useSearch } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, Clock, ArrowRight, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

export default function Flights() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const date = params.get('date') || '';
  const passengerCount = parseInt(params.get('passengers') || '1');

  const { flights, airports, airlines, setCurrentFlight, setPassengers, setSeatClass } = useStore();

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesFrom = !from || flight.from === from;
      const matchesTo = !to || flight.to === to;
      const matchesDate = !date || flight.date === date;
      return matchesFrom && matchesTo && matchesDate;
    });
  }, [flights, from, to, date]);

  const getAirport = (code: string) => airports.find((a) => a.code === code);
  const getAirline = (id: string) => airlines.find((a) => a.id === id);

  const calculateDuration = (departure: string, arrival: string) => {
    const [depHours, depMins] = departure.split(':').map(Number);
    const [arrHours, arrMins] = arrival.split(':').map(Number);
    let totalMins = (arrHours * 60 + arrMins) - (depHours * 60 + depMins);
    if (totalMins < 0) totalMins += 24 * 60;
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours}h ${mins}m`;
  };

  const handleSelectFlight = (flight: typeof flights[0], seatClass: 'economy' | 'business') => {
    setCurrentFlight(flight);
    setSeatClass(seatClass);
    const emptyPassengers = Array(passengerCount).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      passportNumber: '',
      nationality: '',
    }));
    setPassengers(emptyPassengers);
    setLocation('/booking/passengers');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4"
            data-testid="button-back"
          >
            ← Back to Search
          </Button>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              {from && to ? (
                <>
                  {getAirport(from)?.city || from}
                  <ArrowRight className="inline w-6 h-6 mx-3" />
                  {getAirport(to)?.city || to}
                </>
              ) : (
                'Available Flights'
              )}
            </h1>
            {date && (
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Badge>
            )}
            <Badge variant="outline" className="text-sm py-1 px-3">
              {passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>{filteredFlights.length} flights found</span>
          </div>
        </motion.div>

        {filteredFlights.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Plane className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No flights found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria
            </p>
            <Button onClick={() => setLocation('/')} data-testid="button-new-search">
              New Search
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredFlights.map((flight, index) => {
              const airline = getAirline(flight.airlineId);
              const fromAirport = getAirport(flight.from);
              const toAirport = getAirport(flight.to);
              const duration = calculateDuration(flight.departureTime, flight.arrivalTime);

              return (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-flight-${flight.id}`}>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                        <div className="lg:col-span-3 p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="text-2xl">{airline?.logo}</div>
                            <div>
                              <p className="font-semibold">{airline?.name}</p>
                              <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <p className="text-3xl font-bold">{flight.departureTime}</p>
                              <p className="text-sm font-medium">{flight.from}</p>
                              <p className="text-xs text-muted-foreground">{fromAirport?.city}</p>
                            </div>

                            <div className="flex-1 flex flex-col items-center">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Clock className="w-4 h-4" />
                                {duration}
                              </div>
                              <div className="w-full flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-blue-300" />
                                <Plane className="w-5 h-5 text-primary" />
                                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-300 to-primary" />
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">Direct</p>
                            </div>

                            <div className="text-center">
                              <p className="text-3xl font-bold">{flight.arrivalTime}</p>
                              <p className="text-sm font-medium">{flight.to}</p>
                              <p className="text-xs text-muted-foreground">{toAirport?.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-1 bg-gray-50 p-6 flex flex-col justify-center gap-4 border-l">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white border hover:border-primary transition-colors">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Economy</p>
                                <p className="text-xl font-bold">${flight.economyPrice}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleSelectFlight(flight, 'economy')}
                                data-testid={`button-select-economy-${flight.id}`}
                              >
                                Select
                              </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 hover:border-amber-400 transition-colors">
                              <div>
                                <p className="text-xs text-amber-700 uppercase tracking-wide font-medium">Business</p>
                                <p className="text-xl font-bold text-amber-900">${flight.businessPrice}</p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600"
                                onClick={() => handleSelectFlight(flight, 'business')}
                                data-testid={`button-select-business-${flight.id}`}
                              >
                                Select
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
