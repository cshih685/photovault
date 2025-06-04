"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  ShoppingCart, 
  Heart,
  HeartOff,
  ZoomIn 
} from 'lucide-react';
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

// Mock photo data
const photos = [
  {
    id: 1,
    title: 'Mountain Landscape',
    photographer: 'Jane Smith',
    price: 4.99,
    url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    photographer: 'John Doe',
    price: 3.99,
    url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'City Skyline',
    photographer: 'Alex Johnson',
    price: 5.99,
    url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Forest Trail',
    photographer: 'Emily Chen',
    price: 2.99,
    url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title: 'Desert Dunes',
    photographer: 'Michael Brown',
    price: 6.99,
    url: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    title: 'Winter Cabin',
    photographer: 'Sarah Wilson',
    price: 4.99,
    url: 'https://images.pexels.com/photos/3609832/pexels-photo-3609832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 7,
    title: 'Autumn Forest',
    photographer: 'David Lee',
    price: 3.99,
    url: 'https://images.pexels.com/photos/1643113/pexels-photo-1643113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 8,
    title: 'Tropical Beach',
    photographer: 'Lisa Jones',
    price: 5.99,
    url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 9,
    title: 'Mountain Lake',
    photographer: 'Robert Taylor',
    price: 4.99,
    url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export function PhotoGallery() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative rounded-lg overflow-hidden transition-all">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-medium">{photo.title}</h3>
              <p className="text-white/70 text-sm">by {photo.photographer}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-white font-medium">${photo.price}</span>
                <div className="flex gap-1">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => toggleFavorite(photo.id)}
                  >
                    {favorites.includes(photo.id) ? (
                      <HeartOff className="h-4 w-4" />
                    ) : (
                      <Heart className="h-4 w-4" />
                    )}
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <ZoomIn className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
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
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => toggleFavorite(photo.id)}
                          >
                            {favorites.includes(photo.id) ? (
                              <>
                                <HeartOff className="mr-2 h-4 w-4" />
                                Remove from Favorites
                              </>
                            ) : (
                              <>
                                <Heart className="mr-2 h-4 w-4" />
                                Add to Favorites
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <span className="flex items-center text-lg font-semibold">
                            ${photo.price}
                          </span>
                          <Button>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy Now
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Buy now</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}