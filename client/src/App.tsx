import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import Home from "@/pages/home";
import Flights from "@/pages/flights";
import Passengers from "@/pages/passengers";
import Seats from "@/pages/seats";
import Payment from "@/pages/payment";
import Confirmation from "@/pages/confirmation";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/flights" component={Flights} />
      <Route path="/booking/passengers" component={Passengers} />
      <Route path="/booking/seats" component={Seats} />
      <Route path="/booking/payment" component={Payment} />
      <Route path="/booking/confirmation/:id" component={Confirmation} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
