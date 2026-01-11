import { create } from 'zustand';

export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airlineId: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  economyPrice: number;
  businessPrice: number;
  economySeats: number;
  businessSeats: number;
  occupiedSeats: string[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

export interface Booking {
  id: string;
  flightId: string;
  passengers: Passenger[];
  seats: string[];
  seatClass: 'economy' | 'business';
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  pnr: string;
}

interface AppState {
  airlines: Airline[];
  airports: Airport[];
  flights: Flight[];
  bookings: Booking[];
  currentBooking: {
    flight: Flight | null;
    passengers: Passenger[];
    seats: string[];
    seatClass: 'economy' | 'business';
  };
  isAdmin: boolean;
  
  addAirline: (airline: Omit<Airline, 'id'>) => void;
  removeAirline: (id: string) => void;
  addAirport: (airport: Omit<Airport, 'id'>) => void;
  removeAirport: (id: string) => void;
  addFlight: (flight: Omit<Flight, 'id' | 'occupiedSeats'>) => void;
  removeFlight: (id: string) => void;
  
  setCurrentFlight: (flight: Flight) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setSeats: (seats: string[]) => void;
  setSeatClass: (seatClass: 'economy' | 'business') => void;
  
  confirmBooking: () => Booking | null;
  toggleAdmin: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);
const generatePNR = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const initialAirlines: Airline[] = [
  { id: '1', name: 'SkyWings Airlines', code: 'SW', logo: '✈️' },
  { id: '2', name: 'Global Air', code: 'GA', logo: '🌍' },
  { id: '3', name: 'Blue Horizon', code: 'BH', logo: '🔵' },
  { id: '4', name: 'Pacific Airways', code: 'PA', logo: '🌊' },
];

const initialAirports: Airport[] = [
  { id: '1', name: 'John F. Kennedy International', code: 'JFK', city: 'New York', country: 'USA' },
  { id: '2', name: 'Los Angeles International', code: 'LAX', city: 'Los Angeles', country: 'USA' },
  { id: '3', name: 'London Heathrow', code: 'LHR', city: 'London', country: 'UK' },
  { id: '4', name: 'Dubai International', code: 'DXB', city: 'Dubai', country: 'UAE' },
  { id: '5', name: 'Tokyo Haneda', code: 'HND', city: 'Tokyo', country: 'Japan' },
  { id: '6', name: 'Singapore Changi', code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { id: '7', name: 'Sydney Airport', code: 'SYD', city: 'Sydney', country: 'Australia' },
  { id: '8', name: 'Paris Charles de Gaulle', code: 'CDG', city: 'Paris', country: 'France' },
];

const initialFlights: Flight[] = [
  {
    id: '1',
    airlineId: '1',
    flightNumber: 'SW101',
    from: 'JFK',
    to: 'LAX',
    departureTime: '08:00',
    arrivalTime: '11:30',
    date: '2026-01-15',
    economyPrice: 299,
    businessPrice: 899,
    economySeats: 150,
    businessSeats: 24,
    occupiedSeats: ['1A', '1B', '2C', '5D', '10A', '10B'],
  },
  {
    id: '2',
    airlineId: '2',
    flightNumber: 'GA202',
    from: 'LHR',
    to: 'DXB',
    departureTime: '14:00',
    arrivalTime: '23:30',
    date: '2026-01-15',
    economyPrice: 549,
    businessPrice: 1499,
    economySeats: 200,
    businessSeats: 32,
    occupiedSeats: ['3A', '3B', '7C', '12D'],
  },
  {
    id: '3',
    airlineId: '3',
    flightNumber: 'BH303',
    from: 'SIN',
    to: 'HND',
    departureTime: '09:30',
    arrivalTime: '17:45',
    date: '2026-01-16',
    economyPrice: 425,
    businessPrice: 1250,
    economySeats: 180,
    businessSeats: 28,
    occupiedSeats: ['2A', '6B', '8C'],
  },
  {
    id: '4',
    airlineId: '4',
    flightNumber: 'PA404',
    from: 'SYD',
    to: 'LAX',
    departureTime: '22:00',
    arrivalTime: '18:00',
    date: '2026-01-17',
    economyPrice: 899,
    businessPrice: 2499,
    economySeats: 220,
    businessSeats: 40,
    occupiedSeats: ['1A', '1C', '4D', '15A', '15B'],
  },
  {
    id: '5',
    airlineId: '1',
    flightNumber: 'SW505',
    from: 'JFK',
    to: 'LHR',
    departureTime: '19:00',
    arrivalTime: '07:00',
    date: '2026-01-15',
    economyPrice: 649,
    businessPrice: 1899,
    economySeats: 180,
    businessSeats: 36,
    occupiedSeats: ['2B', '5C', '8A', '12D', '20A'],
  },
];

export const useStore = create<AppState>((set, get) => ({
  airlines: initialAirlines,
  airports: initialAirports,
  flights: initialFlights,
  bookings: [],
  currentBooking: {
    flight: null,
    passengers: [],
    seats: [],
    seatClass: 'economy',
  },
  isAdmin: false,

  addAirline: (airline) =>
    set((state) => ({
      airlines: [...state.airlines, { ...airline, id: generateId() }],
    })),

  removeAirline: (id) =>
    set((state) => ({
      airlines: state.airlines.filter((a) => a.id !== id),
    })),

  addAirport: (airport) =>
    set((state) => ({
      airports: [...state.airports, { ...airport, id: generateId() }],
    })),

  removeAirport: (id) =>
    set((state) => ({
      airports: state.airports.filter((a) => a.id !== id),
    })),

  addFlight: (flight) =>
    set((state) => ({
      flights: [...state.flights, { ...flight, id: generateId(), occupiedSeats: [] }],
    })),

  removeFlight: (id) =>
    set((state) => ({
      flights: state.flights.filter((f) => f.id !== id),
    })),

  setCurrentFlight: (flight) =>
    set((state) => ({
      currentBooking: { ...state.currentBooking, flight },
    })),

  setPassengers: (passengers) =>
    set((state) => ({
      currentBooking: { ...state.currentBooking, passengers },
    })),

  setSeats: (seats) =>
    set((state) => ({
      currentBooking: { ...state.currentBooking, seats },
    })),

  setSeatClass: (seatClass) =>
    set((state) => ({
      currentBooking: { ...state.currentBooking, seatClass, seats: [] },
    })),

  confirmBooking: () => {
    const { currentBooking, flights } = get();
    if (!currentBooking.flight || currentBooking.passengers.length === 0 || currentBooking.seats.length === 0) {
      return null;
    }

    const price = currentBooking.seatClass === 'economy' 
      ? currentBooking.flight.economyPrice 
      : currentBooking.flight.businessPrice;

    const booking: Booking = {
      id: generateId(),
      flightId: currentBooking.flight.id,
      passengers: currentBooking.passengers,
      seats: currentBooking.seats,
      seatClass: currentBooking.seatClass,
      totalPrice: price * currentBooking.passengers.length,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      pnr: generatePNR(),
    };

    set((state) => ({
      bookings: [...state.bookings, booking],
      flights: state.flights.map((f) =>
        f.id === currentBooking.flight?.id
          ? { ...f, occupiedSeats: [...f.occupiedSeats, ...currentBooking.seats] }
          : f
      ),
      currentBooking: {
        flight: null,
        passengers: [],
        seats: [],
        seatClass: 'economy',
      },
    }));

    return booking;
  },

  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
}));
