import GlobalApi from '../../_utils/GlobalApi.js';
import Image from 'next/image';
// Booking happens on a dedicated route
import { notFound } from 'next/navigation';

export default async function EventInfoPage({ params }) {
  const { slug } = params || {};
  const { eventdetails } = await GlobalApi.fetchHygraphEventDetailsBySlug(String(slug));

  if (!eventdetails || eventdetails.length === 0) {
    notFound();
  }

  const event = eventdetails[0];

  return (
    <div className="pt-28 pb-12 px-5 md:px-10 lg:px-20 bg-gray-950 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          {event.images && event.images.length > 0 ? (
            <Image
              src={event.images[0].url}
              alt={`Image for ${event.name}`}
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-auto shadow-lg"
              priority
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 text-white lg:col-span-2">
          <h1 className="text-4xl font-extrabold">{event.name}</h1>
          <p className="text-lg text-white/80">
            <span className="font-semibold">Date:</span>
            {' '}{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-3xl font-bold">${event.price}</p>
          <div className="text-md text-white/90">
            <label htmlFor="booking-slot" className="block mb-2 font-semibold text-white/80">Available Slots</label>
            <div className="relative group md:w-72 w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
              <select
                id="booking-slot"
                className="relative w-full appearance-none rounded-xl px-4 py-3 bg-gray-900/70 border border-white/15 text-white/90 backdrop-blur-md shadow-lg transition focus:outline-none focus:ring-2 focus:ring-purple-500/70 hover:border-white/25"
                defaultValue=""
              >
                <option value="" disabled className="bg-gray-900">Select an option</option>
                {(Array.isArray(event.bookings) ? event.bookings : [event.bookings]).filter(Boolean).map((b, i) => (
                  <option key={`${b}-${i}`} value={b} className="bg-gray-900 text-white">{b}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition">▾</span>
            </div>
            <p className="mt-2 text-xs text-white/60">Choose your ticket type. More options may appear closer to the event.</p>
          </div>

          <div className="mt-4">
            <a
              href={`/bookingfrom`}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90 shadow-lg transition"
            >
              Book Tickets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


