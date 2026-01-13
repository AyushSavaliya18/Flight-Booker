import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, Settings, Home, Search, User, Menu, X, LogIn, UserPlus, Gift, Headphones, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = location.startsWith('/admin');

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Flights', href: '/flights', icon: Search },
    { label: 'Deals', href: '#', icon: Gift },
    { label: 'Destinations', href: '#', icon: MapPin },
    { label: 'Support', href: '#', icon: Headphones },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setLocation('/')}
              data-testid="link-home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                SkyBook
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => link.href !== '#' && setLocation(link.href)}
                  className={location === link.href ? 'bg-primary/10 text-primary' : ''}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/login')}
                data-testid="nav-login"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => setLocation('/signup')}
                data-testid="nav-signup"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
            
            <Button
              variant={isAdminPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLocation('/admin')}
              className="hidden sm:flex"
              data-testid="nav-admin"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Access
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">SkyBook</span>
                  </div>
                  
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        if (link.href !== '#') setLocation(link.href);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <link.icon className="w-4 h-4 mr-3" />
                      {link.label}
                    </Button>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => {
                        setLocation('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setLocation('/signup');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setLocation('/admin');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
