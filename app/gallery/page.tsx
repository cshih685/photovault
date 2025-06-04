import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, Rows, Image } from 'lucide-react';
import { PhotoGallery } from '@/components/photo-gallery';
import { PhotoGallerySkeleton } from '@/components/photo-gallery-skeleton';

export default function GalleryPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Gallery</h1>
          <p className="text-muted-foreground max-w-[500px]">
            Browse through our collection of premium photos available for purchase.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/auth/signin">
            <Button variant="outline" size="sm">
              Sign in to Upload
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Tabs defaultValue="grid" className="w-full max-w-[400px]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="grid">
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="rows">
              <Rows className="h-4 w-4 mr-2" />
              Rows
            </TabsTrigger>
            <TabsTrigger value="masonry">
              <Image className="h-4 w-4 mr-2" />
              Masonry
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <Suspense fallback={<PhotoGallerySkeleton />}>
        <PhotoGallery />
      </Suspense>
    </div>
  );
}