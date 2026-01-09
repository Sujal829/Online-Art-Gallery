import React from 'react';
import {  motion  } from 'framer-motion';
import {  Minus, Plus, Trash2, ShoppingBag, ArrowRight  } from 'lucide-react';
import {  Link  } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import {  useCart  } from '@/context/CartContext';
import {  Button  } from '@/components/ui/button';
import {  Separator  } from '@/components/ui/separator';
import {  useToast  } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal, totalDiscount, total, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    clearCart();
    toast({
      title: 'Order placed successfully!',
      description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-heading text-2xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Discover beautiful artworks in our gallery
            </p>
            <Link to="/">
              <Button>
                Explore Gallery
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-semibold mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const discountedPrice = item.product.price - (item.product.price * item.product.discount) / 100;
              
              return (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg p-4 shadow-card flex gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.product.category}
                    </p>
                    <h3 className="font-heading text-lg font-medium">{item.product.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.product.artistName}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-heading font-semibold">
                        Rs:-{discountedPrice.toLocaleString()}
                      </span>
                      {item.product.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          Rs:-{item.product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-lg p-6 shadow-card sticky top-24"
            >
              <h2 className="font-heading text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs:-{subtotal.toLocaleString()}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm text-gallery-success">
                    <span>Discount</span>
                    <span>-Rs:-{totalDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-heading font-semibold text-lg">
                  <span>Total</span>
                  <span>Rs:-{total.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <Link to="/">
                <Button variant="ghost" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
