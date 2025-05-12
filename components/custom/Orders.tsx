/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const Orders = () => {
  const createOrder = useMutation(api.orders.createOrder);
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress;
  const isAdmin = email === process.env.NEXT_PUBLIC_isAdmin;
  const getAllOrders = useQuery(api.orders.getAllOrders);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
 
  
  const date = Date.now(); // Current date in milliseconds

  // Make sure to convert order dates into milliseconds for accurate comparison
  const newOrders = getAllOrders?.filter(order => new Date(order.date).getTime() > date).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastOrders = getAllOrders?.filter(order => new Date(order.date).getTime() <= date).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const form = useForm({
    defaultValues: {
      name: '',
      date: '',
      items: '',
      numberOfPeople: 0,
      floor: 0,
      department: '',
      phoneNumber:''
    },
  });

  async function onSubmit(data: any) {
    try {
      await createOrder({
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
        numberOfPeople: Number(data.numberOfPeople), 
        floor: Number(data.floor), 
      });
      router.push('/confirmorder');
      form.reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  }

  return (
    <div className="p-4">
      {isAdmin ? (
         <div className="container mx-auto p-6">
         <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">All Orders</h1>
   
         {/* New Orders Section */}
         <h2 className="text-xl font-semibold text-gray-800 mb-4">New Orders</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {newOrders?.length  ? (
             newOrders.map((item, index) => (
               <Card key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                 <CardHeader>
                   <CardTitle className="text-2xl font-semibold text-gray-900">{item.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2 text-xl">
                   <h1 className="text-red-500">
                     <span className="font-medium">Phone Number:</span> {item.phoneNumber}
                   </h1>
                   <p className="text-gray-700">
                     <span className="font-medium">Date:</span> {item.date.slice(8, 10)} <span>/</span>
                     {item.date.slice(5, 7)}
                     <span>/</span>{item.date.slice(0, 4)}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">People:</span> {item.numberOfPeople}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Items:</span> {item.items}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Floor:</span> {item.floor}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Department:</span> {item.department}
                   </p>
                   <p className="text-red-900 text-2xl font-semibold">
                     Customer is waiting since{' '}
                     {Math.floor((date - item._creationTime) / (1000 * 60 * 60))}:
                     {Math.floor(((date - item._creationTime) % (1000 * 60 * 60)) / (1000 * 60))}:
                     {Math.floor(((date - item._creationTime) % (1000 * 60)) / 1000)}
                   </p>
                 </CardContent>
               </Card>
             ))
           ) : (
             <p className="text-gray-500">No new orders found.</p>
           )}
         </div>
   
         {/* Past Orders Section */}
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Orders</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {pastOrders?.length ? (
             pastOrders.map((item, index) => (
               <Card key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                 <CardHeader>
                   <CardTitle className="text-2xl font-semibold text-gray-900">{item.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2 text-xl">
                   <h1 className="text-red-500">
                     <span className="font-medium">Phone Number:</span> {item.phoneNumber}
                   </h1>
                   <p className="text-gray-700">
                     <span className="font-medium">Date:</span> {item.date.slice(8, 10)} <span>/</span>
                     {item.date.slice(5, 7)}
                     <span>/</span>{item.date.slice(0, 4)}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">People:</span> {item.numberOfPeople}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Items:</span> {item.items}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Floor:</span> {item.floor}
                   </p>
                   <p className="text-gray-700">
                     <span className="font-medium">Department:</span> {item.department}
                   </p>
                 </CardContent>
               </Card>
             ))
           ) : (
             <p className="text-gray-500">No past orders found.</p>
           )}
         </div>
       </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-150">
          <Card className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center text-gray-800">
                Place Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Order</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Items</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfPeople"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of People</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floor</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 rounded-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 rounded-lg" type='tel'/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
                      isSubmitted
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isSubmitted ? 'Order Submitted 🎉' : 'Submit Order'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Orders;
