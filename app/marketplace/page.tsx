import { Suspense } from 'react';
import { PhotoMarketplace } from '@/components/photo-marketplace';
import { PhotoGallerySkeleton } from '@/components/photo-gallery-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  ImagePlus,
  Filter,
  ArrowUpDown
} from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Marketplace</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Discover and purchase high-quality photos from talented photographers around the world.
          </p>
        </div>
        <Button>
          <ImagePlus className="mr-2 h-4 w-4" />
          Sell Your Photos
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="landscape">Landscape</TabsTrigger>
            <TabsTrigger value="portrait">Portrait</TabsTrigger>
            <TabsTrigger value="nature">Nature</TabsTrigger>
            <TabsTrigger value="urban">Urban</TabsTrigger>
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="w-full sm:w-64 shrink-0">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" className="h-8">
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">$</span>
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-full rounded-md border border-input px-3 py-1 text-sm"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">$</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-full rounded-md border border-input px-3 py-1 text-sm"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">License Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="license-standard" type="checkbox" className="mr-2" />
                    <label htmlFor="license-standard" className="text-sm">Standard</label>
                  </div>
                  <div className="flex items-center">
                    <input id="license-extended" type="checkbox" className="mr-2" />
                    <label htmlFor="license-extended" className="text-sm">Extended</label>
                  </div>
                  <div className="flex items-center">
                    <input id="license-commercial" type="checkbox" className="mr-2" />
                    <label htmlFor="license-commercial" className="text-sm">Commercial</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">Orientation</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="orientation-landscape" type="checkbox" className="mr-2" />
                    <label htmlFor="orientation-landscape" className="text-sm">Landscape</label>
                  </div>
                  <div className="flex items-center">
                    <input id="orientation-portrait" type="checkbox" className="mr-2" />
                    <label htmlFor="orientation-portrait" className="text-sm">Portrait</label>
                  </div>
                  <div className="flex items-center">
                    <input id="orientation-square" type="checkbox" className="mr-2" />
                    <label htmlFor="orientation-square" className="text-sm">Square</label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">Showing 120 results</span>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-3 w-3" />
              Sort by: Featured
            </Button>
          </div>
          
          <Suspense fallback={<PhotoGallerySkeleton />}>
            <PhotoMarketplace />
          </Suspense>
        </div>
      </div>
    </div>
  );
}