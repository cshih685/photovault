"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
  price: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: 'Price must be a valid number' }
  ),
  categories: z.array(z.string()).min(1, { message: 'Select at least one category' }),
  tags: z.string(),
  license: z.string({ required_error: 'Please select a license' }),
  isForSale: z.boolean().default(false),
});

// Mock categories and licenses
const categories = [
  { id: 'landscape', name: 'Landscape' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'street', name: 'Street' },
  { id: 'nature', name: 'Nature' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'abstract', name: 'Abstract' },
];

const licenses = [
  { id: 'standard', name: 'Standard License', price: 9.99 },
  { id: 'extended', name: 'Extended License', price: 19.99 },
  { id: 'commercial', name: 'Commercial License', price: 49.99 },
];

export default function UploadPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '9.99',
      categories: [],
      tags: '',
      license: 'standard',
      isForSale: true,
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
    form.setValue('categories', 
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // In a real app, this would upload the photo and save the data
    console.log(values);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Photo</h1>
          <p className="text-muted-foreground">
            Share your work with the world and start earning.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <input {...getInputProps()} />
                {previewImage ? (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="max-h-[300px] mx-auto rounded-md object-contain" 
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-base font-medium">
                      {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse files
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: JPG, PNG, GIF
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Max size: 20MB
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Give your photo a title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isForSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          List for Sale
                        </FormLabel>
                        <FormDescription>
                          Make this photo available in the marketplace
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your photo..." 
                        className="resize-none min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="9.99" 
                          step="0.01" 
                          min="0" 
                          {...field}
                          disabled={!form.watch('isForSale')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!form.watch('isForSale')}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a license type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {licenses.map((license) => (
                            <SelectItem key={license.id} value={license.id}>
                              {license.name} (${license.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Categories</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {categories.map((category) => (
                    <div 
                      key={category.id}
                      className={`
                        flex items-center p-3 border rounded-md cursor-pointer transition-colors
                        ${selectedCategories.includes(category.id) 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'hover:bg-accent'}
                      `}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <Checkbox 
                        checked={selectedCategories.includes(category.id)} 
                        onCheckedChange={() => {}}
                        className="mr-2"
                      />
                      <span>{category.name}</span>
                    </div>
                  ))}
                </div>
                {form.formState.errors.categories && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.categories.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="landscape, nature, mountains (comma separated)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Add tags to help users find your photo. Separate with commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading || !previewImage}>
                {isLoading ? 'Uploading...' : 'Upload Photo'}
              </Button>
            </form>
          </Form>
        </div>
        
        <div>
          <div className="bg-card border rounded-lg p-6 space-y-6 sticky top-20">
            <h3 className="font-medium text-lg">Upload Guidelines</h3>
            <Separator />
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Photo Requirements</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Minimum resolution: 1920×1080 pixels</li>
                  <li>Maximum file size: 20MB</li>
                  <li>Supported formats: JPG, PNG, GIF</li>
                  <li>No watermarks or text overlays</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Content Guidelines</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>You must own the copyright to the photo</li>
                  <li>No offensive or explicit content</li>
                  <li>No copyrighted material from other creators</li>
                  <li>Proper model releases for recognizable people</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Pricing Tips</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Standard licenses typically range from $5-15</li>
                  <li>Extended licenses can be priced $20-50</li>
                  <li>Commercial licenses often start at $50+</li>
                  <li>Consider photo uniqueness when pricing</li>
                </ul>
              </div>
            </div>
            
            <Separator />
            
            <p className="text-sm text-muted-foreground">
              By uploading, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className=\"text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}