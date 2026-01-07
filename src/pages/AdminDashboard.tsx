import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ArtistCard from '@/components/ArtistCard';
import ProductCard from '@/components/ProductCard';
import { User, Product } from '@/types';
import usersData from '@/data/users.json';
import productsData from '@/data/products.json';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminDashboard: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<User | null>(null);
  const [showProductsModal, setShowProductsModal] = useState(false);

  const artists = usersData.users.filter((u) => u.role === 'artist') as User[];
  const products = productsData.products as Product[];

  const getArtistProductCount = (artistId: number) => {
    return products.filter((p) => p.artistId === artistId).length;
  };

  const getArtistProducts = (artistId: number) => {
    return products.filter((p) => p.artistId === artistId);
  };

  const totalRevenue = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.price - (p.price * p.discount) / 100), 0);
  }, [products]);

  const handleViewProducts = (artist: User) => {
    setSelectedArtist(artist);
    setShowProductsModal(true);
  };

  const stats = [
    { label: 'Total Artists', value: artists.length, icon: Users, color: 'text-accent' },
    { label: 'Total Artworks', value: products.length, icon: Package, color: 'text-gallery-success' },
    { label: 'Est. Total Value', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-accent' },
    { label: 'Avg. Price', value: `$${Math.round(totalRevenue / products.length).toLocaleString()}`, icon: TrendingUp, color: 'text-gallery-warm-gray' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl font-semibold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage artists and monitor gallery performance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-heading text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Artists Section */}
        <div>
          <h2 className="font-heading text-xl font-semibold mb-4">Registered Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                productCount={getArtistProductCount(artist.id)}
                onViewProducts={() => handleViewProducts(artist)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Products Modal */}
      <Dialog open={showProductsModal} onOpenChange={setShowProductsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Artworks by {selectedArtist?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {selectedArtist &&
              getArtistProducts(selectedArtist.id).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
