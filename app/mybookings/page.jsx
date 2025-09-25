// app/mybookings/page.js

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import { fetchMyBookings } from '../_utils/GlobalApi.js';

export default function MyBookings() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  
  function removeBooking(idToRemove) {
    try {
      const stored = JSON.parse(localStorage.getItem('eventhub_bookings') || '{}');
      const userKey = userId;
      const userBookings = Array.isArray(stored[userKey]) ? stored[userKey] : [];
      const next = userBookings.filter((b) => b.id !== idToRemove);
      const updated = { ...stored, [userKey]: next };
      localStorage.setItem('eventhub_bookings', JSON.stringify(updated));
      setBookings(next);
    } catch (e) {
      console.error('Failed to remove booking', e);
    }
  }

  useEffect(() => {
    if (!isSignedIn || !userId) return;
    let active = true;
    setIsLoadingBookings(true);
    fetchMyBookings()
      .then((res) => {
        const list = (res?.bookings || []).map((b) => ({
          id: b._id || b.id,
          eventId: b.event?._id || b.event?.id,
          eventName: b.event?.title,
          date: b.event?.dateTime,
          location: b.event?.location,
          seats: b.seats,
          total: typeof b.totalCents === 'number' ? b.totalCents / 100 : undefined,
          fullName: b.attendeeName,
          email: b.attendeeEmail,
        }));
        if (active) setBookings(list);
      })
      .catch((e) => {
        console.error('Failed to fetch bookings', e);
        setBookings([]);
      })
      .finally(() => setIsLoadingBookings(false));
    return () => { active = false };
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
          <div key={booking.id} className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg hover:bg-white/10 transition-colors duration-300 flex flex-col">
            <h2 className="text-2xl font-semibold text-pink-400 mb-2">{booking.eventName}</h2>
            <div className="text-gray-300 space-y-2 flex-1">
              <p className="text-lg">Date: {booking.date}</p>
              {booking.location && <p className="text-sm">Location: {booking.location}</p>}
              {Array.isArray(booking.seats) && booking.seats.length > 0 ? (
                <div className="text-sm">
                  <div className="text-gray-400 mb-1">Seats</div>
                  <div className="flex flex-wrap gap-2">
                    {booking.seats.map((s) => (
                      <span key={s} className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ) : (
                booking.ticketType && (
                  <p className="text-sm">Ticket: {booking.ticketType} × {booking.quantity}</p>
                )
              )}
              {booking.total != null && (
                <p className="text-sm font-semibold">Total: ${booking.total}</p>
              )}
              {(booking.fullName || booking.email) && (
                <p className="text-xs text-gray-400">Booked for: {booking.fullName} {booking.email && `(${booking.email})`}</p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href={`/EventDeatils/${booking.eventId || ''}`} className="text-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold">Details</Link>
              <button onClick={() => removeBooking(booking.id)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 font-semibold">Remove</button>
              <Link href={`/book/${booking.eventId || ''}`} className="col-span-2 text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold">Book more seats</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}