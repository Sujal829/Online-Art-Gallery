import React, { useState } from 'react';
import {  useNavigate, useLocation  } from 'react-router-dom';
import {  motion  } from 'framer-motion';
import {  Palette, Mail, Lock, AlertCircle  } from 'lucide-react';
import {  useAuth  } from '@/context/AuthContext';
import {  Button  } from '@/components/ui/button';
import {  Input  } from '@/components/ui/input';
import {  Label  } from '@/components/ui/label';
import {  Alert, AlertDescription  } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const result = login(email, password);
    
    if (result.success) {
      // Redirect based on role
      const storedUser = localStorage.getItem('artgallery_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'artist') {
          navigate('/artist');
        } else {
          navigate(from);
        }
      }
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex items-center gap-2">
            <Palette className="h-8 w-8 text-accent" />
            <span className="font-heading text-2xl font-semibold">Artistry</span>
          </div>

          <div>
            <h1 className="font-heading text-3xl font-semibold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to access your account
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground mb-4">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Admin:</span> admin@artgallery.com / admin123</p>
              <p><span className="font-medium">Artist:</span> elena@artgallery.com / artist123</p>
              <p><span className="font-medium">User:</span> user@artgallery.com / user123</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-gallery-charcoal" />
        <img
          src="https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&h=1200&fit=crop"
          alt="Art gallery"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-primary-foreground"
          >
            <h2 className="font-heading text-4xl font-semibold mb-4">
              Art speaks where words fail
            </h2>
            <p className="text-lg opacity-80">
              Discover masterpieces from emerging and established artists worldwide
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
