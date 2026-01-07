import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to add items to cart',
        variant: 'destructive',
      });
      return;
    }
    if (user.role !== 'user') {
      toast({
        title: 'Not available',
        description: 'Only collectors can purchase artworks',
        variant: 'destructive',
      });
      return;
    }
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
            -{product.discount}%
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-heading text-lg font-medium leading-tight">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground">by {product.artistName}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-semibold">
              Rs:-{discountedPrice.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                Rs:-{product.price.toLocaleString()}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
