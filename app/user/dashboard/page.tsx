"use client";

import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Upload,
  Download,
  DollarSign,
  Users,
  Image as ImageIcon,
  Eye,
  ShoppingCart,
  Heart
} from 'lucide-react';

// Mock data for charts
const salesData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 700 },
  { name: 'Jun', amount: 1000 },
];

const categoryData = [
  { name: 'Landscape', value: 45 },
  { name: 'Portrait', value: 25 },
  { name: 'Urban', value: 20 },
  { name: 'Abstract', value: 10 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

// Mock user photos
const userPhotos = [
  {
    id: 1,
    title: 'Mountain Sunrise',
    views: 240,
    downloads: 24,
    likes: 56,
    url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Beach at Sunset',
    views: 185,
    downloads: 17,
    likes: 43,
    url: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'City Lights',
    views: 312,
    downloads: 31,
    likes: 75,
    url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Forest Path',
    views: 126,
    downloads: 8,
    likes: 32,
    url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function UserDashboard() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your photos and view your sales statistics.
          </p>
        </div>
        <div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248.80</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">
              +4 new uploads this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,421</div>
            <p className="text-xs text-muted-foreground">
              +32.8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="photos">Your Photos</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your photo sales over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Photo Categories</CardTitle>
                <CardDescription>Breakdown of your photo categories</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Photos (54)</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort by: Recent
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="py-2">
                    <CardTitle className="text-base">{photo.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="py-2 flex justify-between">
                    <div className="flex space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {photo.views}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        {photo.downloads}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3.5 w-3.5 mr-1" />
                        {photo.likes}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                Your most recent photo sales and licenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Photo</th>
                    <th className="text-left py-3 font-medium">Buyer</th>
                    <th className="text-left py-3 font-medium">License</th>
                    <th className="text-left py-3 font-medium">Date</th>
                    <th className="text-right py-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Mountain Sunrise</td>
                    <td className="py-3">Alex B.</td>
                    <td className="py-3">Standard</td>
                    <td className="py-3">Apr 15, 2025</td>
                    <td className="py-3 text-right">$12.99</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Beach at Sunset</td>
                    <td className="py-3">Maria T.</td>
                    <td className="py-3">Extended</td>
                    <td className="py-3">Apr 12, 2025</td>
                    <td className="py-3 text-right">$24.99</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">City Lights</td>
                    <td className="py-3">John D.</td>
                    <td className="py-3">Commercial</td>
                    <td className="py-3">Apr 10, 2025</td>
                    <td className="py-3 text-right">$49.99</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Forest Path</td>
                    <td className="py-3">Sarah K.</td>
                    <td className="py-3">Standard</td>
                    <td className="py-3">Apr 8, 2025</td>
                    <td className="py-3 text-right">$12.99</td>
                  </tr>
                  <tr>
                    <td className="py-3">Alpine Lake</td>
                    <td className="py-3">Robert P.</td>
                    <td className="py-3">Standard</td>
                    <td className="py-3">Apr 5, 2025</td>
                    <td className="py-3 text-right">$12.99</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Profile Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="name">Name</label>
                    <Input id="name" defaultValue="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <Input id="email" defaultValue="jane.smith@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="username">Username</label>
                    <Input id="username" defaultValue="janesmith" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="website">Website</label>
                    <Input id="website" defaultValue="https://janesmith.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm" htmlFor="paypal">PayPal Email</label>
                    <Input id="paypal" defaultValue="payments@janesmith.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="sales-notifications" defaultChecked />
                    <label htmlFor="sales-notifications" className="text-sm">
                      Email me when I make a sale
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="marketing-notifications" defaultChecked />
                    <label htmlFor="marketing-notifications" className="text-sm">
                      Send me product updates and marketing emails
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}