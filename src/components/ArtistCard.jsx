import React from 'react';
import {  motion  } from 'framer-motion';
import {  Mail, Package  } from 'lucide-react';
import {  Button  } from '@/components/ui/button';
import {  Badge  } from '@/components/ui/badge';

const ArtistCard = ({ artist, productCount, onViewProducts }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-border"
        />
        <div className="flex-1 space-y-1">
          <h3 className="font-heading text-lg font-semibold">{artist.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            {artist.email}
          </div>
          {artist.bio && (
            <p className="text-sm text-muted-foreground mt-2">{artist.bio}</p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{productCount} artworks</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Active</Badge>
          <Button size="sm" onClick={onViewProducts}>
            View Works
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
