import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Flights from "@/pages/flights";
import Passengers from "@/pages/passengers";
import Seats from "@/pages/seats";
import Payment from "@/pages/payment";
import Confirmation from "@/pages/confirmation";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Destinations from "@/pages/destinations";
import NotFound from "@/pages/not-found";
import { useStore } from "@/lib/store";

function Router() {
  const { isAdminAuthenticated } = useStore();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/flights" component={Flights} />
      <Route path="/booking/passengers" component={Passengers} />
      <Route path="/booking/seats" component={Seats} />
      <Route path="/booking/payment" component={Payment} />
      <Route path="/booking/confirmation/:id" component={Confirmation} />
      <Route path="/admin">
        {isAdminAuthenticated ? <Admin /> : <AdminLogin />}
      </Route>
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/destinations" component={Destinations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const hideNavFooter = location === '/login' || location === '/signup';
  const hideFooter = location.startsWith('/admin') || location.startsWith('/booking');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {!hideNavFooter && <Navbar />}
          <main className="flex-1">
            <Router />
          </main>
          {!hideNavFooter && !hideFooter && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
