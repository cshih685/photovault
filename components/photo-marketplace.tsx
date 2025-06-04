"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Heart, HeartOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Mock marketplace data
const marketplacePhotos = [
  {
    id: 1,
    title: 'Morning Mountain Mist',
    photographer: 'Jane Smith',
    price: 12.99,
    rating: 4.8,
    reviews: 34,
    url: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Coastal Sunset',
    photographer: 'John Doe',
    price: 9.99,
    rating: 4.5,
    reviews: 28,
    url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Downtown Cityscape',
    photographer: 'Alex Johnson',
    price: 15.99,
    rating: 4.9,
    reviews: 56,
    url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Hidden Forest Path',
    photographer: 'Emily Chen',
    price: 7.99,
    rating: 4.3,
    reviews: 17,
    url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title: 'Sand Dunes at Sunset',
    photographer: 'Michael Brown',
    price: 19.99,
    rating: 5.0,
    reviews: 42,
    url: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    title: 'Snowy Mountain Cabin',
    photographer: 'Sarah Wilson',
    price: 14.99,
    rating: 4.7,
    reviews: 31,
    url: 'https://images.pexels.com/photos/3609832/pexels-photo-3609832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 7,
    title: 'Fall Colors Trail',
    photographer: 'David Lee',
    price: 11.99,
    rating: 4.4,
    reviews: 23,
    url: 'https://images.pexels.com/photos/1643113/pexels-photo-1643113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 8,
    title: 'Paradise Beach',
    photographer: 'Lisa Jones',
    price: 16.99,
    rating: 4.6,
    reviews: 38,
    url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 9,
    title: 'Alpine Lake Reflection',
    photographer: 'Robert Taylor',
    price: 13.99,
    rating: 4.8,
    reviews: 45,
    url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export function PhotoMarketplace() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {marketplacePhotos.map((photo) => (
        <Card key={photo.id} className="overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={() => toggleFavorite(photo.id)}
            >
              {favorites.includes(photo.id) ? (
                <HeartOff className="h-4 w-4" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute top-2 left-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[80vw] md:max-w-[65vw]">
                <DialogHeader>
                  <DialogTitle>{photo.title}</DialogTitle>
                  <DialogDescription>
                    by {photo.photographer}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="max-h-[70vh] object-contain rounded-md"
                  />
                </div>
                <DialogFooter className="sm:justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{photo.rating} ({photo.reviews} reviews)</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-lg font-semibold">${photo.price}</span>
                    <Button>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardHeader className="py-3">
            <CardTitle className="text-lg">{photo.title}</CardTitle>
            <CardDescription>by {photo.photographer}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between py-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm">{photo.rating}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">${photo.price}</span>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}