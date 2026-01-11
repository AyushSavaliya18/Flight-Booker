import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Plane, Settings, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { isAdmin, toggleAdmin } = useStore();

  const isAdminPage = location.startsWith('/admin');

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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

          <div className="flex items-center gap-4">
            {!isAdminPage && (
              <Button
                variant="ghost"
                onClick={() => setLocation('/')}
                className="hidden sm:flex"
                data-testid="nav-home"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            )}
            
            <Button
              variant={isAdminPage ? 'default' : 'outline'}
              onClick={() => setLocation('/admin')}
              data-testid="nav-admin"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
