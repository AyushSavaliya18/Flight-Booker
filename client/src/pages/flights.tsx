import { useMemo } from 'react';
import { useLocation, useSearch } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, Clock, ArrowRight, Filter, ChevronDown, Calendar, Users, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header with Image */}
      <div className="relative h-64 bg-primary overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1600"
          className="w-full h-full object-cover opacity-40 scale-105"
          alt="Flight sky"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
                <Plane className="w-10 h-10 rotate-45 text-blue-400" />
                Available Flights
              </h1>
              <p className="text-xl text-gray-200 mt-4 max-w-2xl">
                Explore the best routes and prices for your next adventure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors"
        >
          <div>
            <Button
              variant="ghost"
              onClick={() => setLocation('/')}
              className="mb-4 hover:bg-primary/5 dark:hover:bg-primary/10 -ml-2 dark:text-gray-300"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {from && to ? (
                  <div className="flex items-center gap-3">
                    <span className="text-primary">{getAirport(from)?.city || from}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <span className="text-primary">{getAirport(to)?.city || to}</span>
                  </div>
                ) : (
                  'All Destinations'
                )}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {date && (
              <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-none py-2 px-4 rounded-full text-sm">
                <Calendar className="w-3.5 h-3.5 mr-2" />
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Badge>
            )}
            <Badge variant="outline" className="py-2 px-4 rounded-full text-sm border-gray-200 dark:border-slate-700 dark:text-gray-300">
              <Users className="w-3.5 h-3.5 mr-2" />
              {passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}
            </Badge>
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 mx-2 hidden md:block" />
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span>{filteredFlights.length} flights found</span>
            </div>
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
                  <Card className="overflow-hidden hover:shadow-lg transition-all dark:bg-slate-900 dark:border-slate-800" data-testid={`card-flight-${flight.id}`}>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                        <div className="lg:col-span-3 p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="text-2xl">{airline?.logo}</div>
                            <div>
                              <p className="font-semibold dark:text-white">{airline?.name}</p>
                              <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <p className="text-3xl font-bold dark:text-white">{flight.departureTime}</p>
                              <p className="text-sm font-medium dark:text-gray-300">{flight.from}</p>
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
                              <p className="text-3xl font-bold dark:text-white">{flight.arrivalTime}</p>
                              <p className="text-sm font-medium dark:text-gray-300">{flight.to}</p>
                              <p className="text-xs text-muted-foreground">{toAirport?.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-1 bg-gray-50 dark:bg-slate-800/50 p-6 flex flex-col justify-center gap-4 border-l dark:border-slate-800">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border dark:border-slate-800 hover:border-primary transition-colors">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Economy</p>
                                <p className="text-xl font-bold dark:text-white">${flight.economyPrice}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleSelectFlight(flight, 'economy')}
                                data-testid={`button-select-economy-${flight.id}`}
                              >
                                Select
                              </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-900/50 hover:border-amber-400 transition-colors">
                              <div>
                                <p className="text-xs text-amber-700 dark:text-amber-500 uppercase tracking-wide font-medium">Business</p>
                                <p className="text-xl font-bold text-amber-900 dark:text-amber-100">${flight.businessPrice}</p>
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
