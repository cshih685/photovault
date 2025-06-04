import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  ImagePlus, 
  ShieldCheck, 
  DollarSign,
  Layers, 
  ChevronRight 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Store, Manage & Sell Your Photos
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A secure platform for photographers to store their work and sell it to a global audience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/gallery">
                <Button size="lg">
                  Browse Gallery
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <div 
                key={id} 
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img 
                  src={`https://images.pexels.com/photos/${1000000 + id}/pexels-photo-${1000000 + id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2`} 
                  alt={`Featured photo ${id}`} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">Photo Title</h3>
                    <p className="text-white/80 text-sm">$5.99</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/marketplace">
              <Button variant="outline">
                View All Photos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Platform Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Everything you need to manage and monetize your photography portfolio
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 mb-4">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Unlimited Storage</h3>
              <p className="text-muted-foreground">
                Upload and store your entire photo collection with high-resolution preservation.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Protection</h3>
              <p className="text-muted-foreground">
                Advanced security features to protect your valuable photo assets from theft.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="p-2 rounded-full bg-primary/10 mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Selling</h3>
              <p className="text-muted-foreground">
                Set prices, manage licenses, and sell your photos directly to buyers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between rounded-xl border bg-card p-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
              <p className="text-muted-foreground">
                Join thousands of photographers already using PhotoVault to manage and sell their work.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button size="lg">
                Create Your Account
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}