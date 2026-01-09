import React, { useState, useMemo } from 'react';
import {  useSearchParams  } from 'react-router-dom';
import {  motion  } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import FilterBar from '@/components/FilterBar';
import productsData from '@/data/products.json';

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortOption, setSortOption] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [artistFilter, setArtistFilter] = useState('all');

  const products = productsData.products;
  
  const artists = useMemo(() => {
    return [...new Set(products.map((p) => p.artistName))];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by artist
    if (artistFilter !== 'all') {
      filtered = filtered.filter((p) => p.artistName === artistFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.artistName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    return [...filtered].sort((a, b) => {
      const priceA = a.price - (a.price * a.discount) / 100;
      const priceB = b.price - (b.price * b.discount) / 100;

      switch (sortOption) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [products, selectedCategory, artistFilter, searchQuery, sortOption]);

  const categories = ['Paintings', 'Sketches', 'Digital Art', 'Sculptures'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gallery-gradient">
        <div className="container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
              Discover <span className="text-accent">Exceptional</span> Art
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore curated collections from world-class artists. Find pieces that speak to your soul.
            </p>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-secondary'
              }`}
            >
              All Works
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container py-12">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          artistFilter={artistFilter}
          onArtistFilterChange={setArtistFilter}
          artists={artists}
        />

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No artworks found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Artistry Gallery. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
