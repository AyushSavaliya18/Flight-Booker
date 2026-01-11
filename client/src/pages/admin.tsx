import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Plus, Trash2, Plane, Building2, MapPin, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const airlineSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(2, 'Code must be 2 characters').max(3),
  logo: z.string().min(1, 'Logo emoji is required'),
});

const airportSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(3, 'Code must be 3 characters').max(3),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
});

const flightSchema = z.object({
  airlineId: z.string().min(1, 'Airline is required'),
  flightNumber: z.string().min(2, 'Flight number is required'),
  from: z.string().min(1, 'Departure airport is required'),
  to: z.string().min(1, 'Arrival airport is required'),
  departureTime: z.string().min(1, 'Departure time is required'),
  arrivalTime: z.string().min(1, 'Arrival time is required'),
  date: z.string().min(1, 'Date is required'),
  economyPrice: z.coerce.number().min(1, 'Economy price is required'),
  businessPrice: z.coerce.number().min(1, 'Business price is required'),
  economySeats: z.coerce.number().min(1, 'Economy seats is required'),
  businessSeats: z.coerce.number().min(1, 'Business seats is required'),
});

export default function Admin() {
  const [, setLocation] = useLocation();
  const { airlines, airports, flights, bookings, addAirline, removeAirline, addAirport, removeAirport, addFlight, removeFlight } = useStore();
  const { toast } = useToast();
  const [airlineDialogOpen, setAirlineDialogOpen] = useState(false);
  const [airportDialogOpen, setAirportDialogOpen] = useState(false);
  const [flightDialogOpen, setFlightDialogOpen] = useState(false);

  const airlineForm = useForm<z.infer<typeof airlineSchema>>({
    resolver: zodResolver(airlineSchema),
    defaultValues: { name: '', code: '', logo: '✈️' },
  });

  const airportForm = useForm<z.infer<typeof airportSchema>>({
    resolver: zodResolver(airportSchema),
    defaultValues: { name: '', code: '', city: '', country: '' },
  });

  const flightForm = useForm<z.infer<typeof flightSchema>>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      airlineId: '',
      flightNumber: '',
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      date: '',
      economyPrice: 0,
      businessPrice: 0,
      economySeats: 150,
      businessSeats: 24,
    },
  });

  const handleAddAirline = (data: z.infer<typeof airlineSchema>) => {
    addAirline(data);
    toast({ title: 'Airline added successfully' });
    airlineForm.reset();
    setAirlineDialogOpen(false);
  };

  const handleAddAirport = (data: z.infer<typeof airportSchema>) => {
    addAirport(data);
    toast({ title: 'Airport added successfully' });
    airportForm.reset();
    setAirportDialogOpen(false);
  };

  const handleAddFlight = (data: z.infer<typeof flightSchema>) => {
    addFlight(data);
    toast({ title: 'Flight added successfully' });
    flightForm.reset();
    setFlightDialogOpen(false);
  };

  const getAirline = (id: string) => airlines.find((a) => a.id === id);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage airlines, airports, and flights</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-primary">{bookings.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="airlines" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="airlines" data-testid="tab-airlines">
              <Building2 className="w-4 h-4 mr-2" />
              Airlines
            </TabsTrigger>
            <TabsTrigger value="airports" data-testid="tab-airports">
              <MapPin className="w-4 h-4 mr-2" />
              Airports
            </TabsTrigger>
            <TabsTrigger value="flights" data-testid="tab-flights">
              <Plane className="w-4 h-4 mr-2" />
              Flights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="airlines">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Airlines</CardTitle>
                  <CardDescription>Manage airline partners</CardDescription>
                </div>
                <Dialog open={airlineDialogOpen} onOpenChange={setAirlineDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-airline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Airline
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Airline</DialogTitle>
                    </DialogHeader>
                    <Form {...airlineForm}>
                      <form onSubmit={airlineForm.handleSubmit(handleAddAirline)} className="space-y-4">
                        <FormField
                          control={airlineForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Airline Name</FormLabel>
                              <FormControl>
                                <Input placeholder="SkyWings Airlines" {...field} data-testid="input-airline-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={airlineForm.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Airline Code</FormLabel>
                              <FormControl>
                                <Input placeholder="SW" maxLength={3} {...field} data-testid="input-airline-code" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={airlineForm.control}
                          name="logo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Logo (Emoji)</FormLabel>
                              <FormControl>
                                <Input placeholder="✈️" {...field} data-testid="input-airline-logo" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" data-testid="button-submit-airline">Add Airline</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Flights</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {airlines.map((airline) => (
                      <TableRow key={airline.id} data-testid={`row-airline-${airline.id}`}>
                        <TableCell className="text-2xl">{airline.logo}</TableCell>
                        <TableCell className="font-medium">{airline.name}</TableCell>
                        <TableCell><Badge variant="outline">{airline.code}</Badge></TableCell>
                        <TableCell>{flights.filter((f) => f.airlineId === airline.id).length}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              removeAirline(airline.id);
                              toast({ title: 'Airline removed' });
                            }}
                            data-testid={`button-delete-airline-${airline.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="airports">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Airports</CardTitle>
                  <CardDescription>Manage departure and arrival airports</CardDescription>
                </div>
                <Dialog open={airportDialogOpen} onOpenChange={setAirportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-airport">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Airport
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Airport</DialogTitle>
                    </DialogHeader>
                    <Form {...airportForm}>
                      <form onSubmit={airportForm.handleSubmit(handleAddAirport)} className="space-y-4">
                        <FormField
                          control={airportForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Airport Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John F. Kennedy International" {...field} data-testid="input-airport-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={airportForm.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>IATA Code</FormLabel>
                              <FormControl>
                                <Input placeholder="JFK" maxLength={3} {...field} data-testid="input-airport-code" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={airportForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} data-testid="input-airport-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={airportForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="USA" {...field} data-testid="input-airport-country" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" data-testid="button-submit-airport">Add Airport</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {airports.map((airport) => (
                      <TableRow key={airport.id} data-testid={`row-airport-${airport.id}`}>
                        <TableCell><Badge>{airport.code}</Badge></TableCell>
                        <TableCell className="font-medium">{airport.name}</TableCell>
                        <TableCell>{airport.city}</TableCell>
                        <TableCell>{airport.country}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              removeAirport(airport.id);
                              toast({ title: 'Airport removed' });
                            }}
                            data-testid={`button-delete-airport-${airport.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Flights</CardTitle>
                  <CardDescription>Manage flight schedules</CardDescription>
                </div>
                <Dialog open={flightDialogOpen} onOpenChange={setFlightDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-flight">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Flight
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Flight</DialogTitle>
                    </DialogHeader>
                    <Form {...flightForm}>
                      <form onSubmit={flightForm.handleSubmit(handleAddFlight)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="airlineId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Airline</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-flight-airline">
                                      <SelectValue placeholder="Select airline" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {airlines.map((airline) => (
                                      <SelectItem key={airline.id} value={airline.id}>
                                        {airline.logo} {airline.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="flightNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Flight Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="SW101" {...field} data-testid="input-flight-number" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="from"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>From</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-flight-from">
                                      <SelectValue placeholder="Departure" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {airports.map((airport) => (
                                      <SelectItem key={airport.id} value={airport.code}>
                                        {airport.city} ({airport.code})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="to"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>To</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-flight-to">
                                      <SelectValue placeholder="Arrival" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {airports.map((airport) => (
                                      <SelectItem key={airport.id} value={airport.code}>
                                        {airport.city} ({airport.code})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} data-testid="input-flight-date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="departureTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Departure</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} data-testid="input-flight-departure" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="arrivalTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Arrival</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} data-testid="input-flight-arrival" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="economyPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Economy Price ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} data-testid="input-flight-economy-price" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="businessPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Price ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} data-testid="input-flight-business-price" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={flightForm.control}
                            name="economySeats"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Economy Seats</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} data-testid="input-flight-economy-seats" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={flightForm.control}
                            name="businessSeats"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Seats</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} data-testid="input-flight-business-seats" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" className="w-full" data-testid="button-submit-flight">Add Flight</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Flight</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Economy</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flights.map((flight) => {
                      const airline = getAirline(flight.airlineId);
                      return (
                        <TableRow key={flight.id} data-testid={`row-flight-${flight.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{airline?.logo}</span>
                              <span className="font-medium">{flight.flightNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{flight.from}</Badge>
                            <span className="mx-1">→</span>
                            <Badge variant="outline">{flight.to}</Badge>
                          </TableCell>
                          <TableCell>{flight.date}</TableCell>
                          <TableCell>{flight.departureTime} - {flight.arrivalTime}</TableCell>
                          <TableCell>${flight.economyPrice}</TableCell>
                          <TableCell>${flight.businessPrice}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => {
                                removeFlight(flight.id);
                                toast({ title: 'Flight removed' });
                              }}
                              data-testid={`button-delete-flight-${flight.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
