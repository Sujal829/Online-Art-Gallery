import React from 'react';
import {  Link, useNavigate  } from 'react-router-dom';
import {  motion  } from 'framer-motion';
import {  ShoppingCart, User, LogOut, Palette, LayoutDashboard  } from 'lucide-react';
import {  useAuth  } from '@/context/AuthContext';
import {  useCart  } from '@/context/CartContext';
import {  Button  } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-accent" />
          <span className="font-heading text-xl font-semibold tracking-tight">
            Artistry
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Gallery
          </Link>
          <Link
            to="/?category=Paintings"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Paintings
          </Link>
          <Link
            to="/?category=Sculptures"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sculptures
          </Link>
          <Link
            to="/?category=Digital Art"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Digital Art
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user?.role === 'user' && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden md:inline text-sm font-medium">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user?.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                {user?.role === 'artist' && (
                  <DropdownMenuItem onClick={() => navigate('/artist')}>
                    <Palette className="mr-2 h-4 w-4" />
                    Artist Dashboard
                  </DropdownMenuItem>
                )}
                {user?.role === 'user' && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/cart')}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart ({totalItems})
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/login')} variant="default">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
