import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from '@/components/ui/select';
import {  Input  } from '@/components/ui/input';
import {  Search  } from 'lucide-react';

const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  searchQuery,
  onSearchChange,
  artistFilter,
  onArtistFilterChange,
  artists,
}) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-card mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={selectedCategory} onValueChange={(value) => onCategoryChange(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Paintings">Paintings</SelectItem>
            <SelectItem value="Sketches">Sketches</SelectItem>
            <SelectItem value="Digital Art">Digital Art</SelectItem>
            <SelectItem value="Sculptures">Sculptures</SelectItem>
          </SelectContent>
        </Select>

        <Select value={artistFilter} onValueChange={onArtistFilterChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Artist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            {artists.map((artist) => (
              <SelectItem key={artist} value={artist}>
                {artist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={(value) => onSortChange(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
