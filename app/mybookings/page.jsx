// app/mybookings/page.js

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';

export default function MyBookings() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  useEffect(() => {
    if (isSignedIn && userId) {
      const fetchBookings = async () => {
        setIsLoadingBookings(true);
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This is where you would fetch data for the specific user
        // Example: const response = await fetch(`/api/bookings?userId=${userId}`);
        // const data = await response.json();
        
        // Dummy data for demonstration
        const dummyBookings = [
          // { id: 1, eventName: 'Concert XYZ', date: '2025-08-10' },
          // { id: 2, eventName: 'Festival ABC', date: '2025-09-22' },
        ];
        
        setBookings(dummyBookings);
        setIsLoadingBookings(false);
      };

      fetchBookings();
    }
  }, [isSignedIn, userId]);

  // Conditional loading state for both Clerk and data fetching
  if (!isLoaded || (isSignedIn && isLoadingBookings)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-white text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-xl">Loading...</p>
      </div>
    );
  }

  // Handle the case where the user is not signed in
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-4">You are not signed in</h1>
        <p className="text-lg mb-6">Please sign in to view your bookings.</p>
        <SignInButton mode="modal">
          <button className="px-6 py-3 font-semibold text-lg rounded-full bg-gradient-to-br from-pink-500 to-red-600 text-white shadow-lg hover:scale-105 hover:shadow-red-400/50 transition-all duration-300">
            Sign In to My Bookings
          </button>
        </SignInButton>
      </div>
    );
  }

  // Handle the case where the user has no bookings
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-4">No Bookings Found</h1>
        <p className="text-lg mb-6">It looks like you haven't booked any tickets yet. Start exploring events now!</p>
        <Link href="/">
          <button className="px-6 py-3 font-semibold text-lg rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg hover:scale-105 hover:shadow-purple-400/50 transition-all duration-300">
            Find Events
          </button>
        </Link>
      </div>
    );
  }

  // Main content for signed-in users with bookings
  return (
    <div className="min-h-[calc(100vh-200px)] text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-pink-400 mb-2">{booking.eventName}</h2>
            <p className="text-gray-300 text-lg">Date: {booking.date}</p>
            {/* Add more booking details here */}
          </div>
        ))}
      </div>
    </div>
  );
}