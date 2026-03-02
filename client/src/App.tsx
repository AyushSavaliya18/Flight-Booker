import { motion, AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
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
import Deals from "@/pages/deals";
import Support from "@/pages/support";
import MyBookings from "@/pages/footer/my-bookings";
import TravelGuide from "@/pages/footer/travel-guide";
import FlightStatus from "@/pages/footer/flight-status";
import HelpCenter from "@/pages/footer/help-center";
import FAQs from "@/pages/footer/faqs";
import PolicyPage from "@/pages/footer/privacy-policy";
import NotFound from "@/pages/not-found";
import { useStore } from "@/lib/store";
import { ThemeProvider } from "@/components/theme-provider";

function Router() {
  const { isAdminAuthenticated } = useStore();
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Switch location={location}>
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
          <Route path="/deals" component={Deals} />
          <Route path="/support" component={Support} />
          <Route path="/my-bookings" component={MyBookings} />
          <Route path="/travel-guide" component={TravelGuide} />
          <Route path="/flight-status" component={FlightStatus} />
          <Route path="/help-center" component={HelpCenter} />
          <Route path="/faqs" component={FAQs} />
          <Route path="/cancellation-policy">
            <PolicyPage title="Cancellation Policy" />
          </Route>
          <Route path="/refund-policy">
            <PolicyPage title="Refund Policy" />
          </Route>
          <Route path="/privacy-policy">
            <PolicyPage title="Privacy Policy" />
          </Route>
          <Route path="/terms-of-service">
            <PolicyPage title="Terms of Service" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  const hideNavFooter = location === '/login' || location === '/signup';
  const hideFooter = location.startsWith('/admin') || location.startsWith('/booking');

  // Scroll to top on route change with custom smooth behavior
  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 12);
      }
    };
    scrollToTop();
  }, [location]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
            {/* Global Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blob animate-slow-spin dark:bg-primary/5"
              />
              <motion.div
                animate={{
                  x: [0, -80, 0],
                  y: [0, 100, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-blue-400/10 rounded-full blob animate-reverse-slow-spin dark:bg-blue-400/5"
              />
              <motion.div
                animate={{
                  x: [0, 50, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blob dark:bg-indigo-500/5"
              />
              
              {/* Floating Particles */}
              <div className="absolute inset-0 opacity-20 dark:opacity-10">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -1000],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 10 + Math.random() * 20,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 20
                    }}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: "-5%"
                    }}
                  />
                ))}
              </div>
            </div>

            {!hideNavFooter && <Navbar />}
            <main className="flex-1 relative z-10">
              <Router />
            </main>
            {!hideNavFooter && !hideFooter && <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
