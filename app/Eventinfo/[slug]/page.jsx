import GlobalApi from '../../_utils/GlobalApi.js';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Force this page to always render dynamically (needed for async data fetch)
export const dynamic = 'force-dynamic';

export default async function EventInfoPage({ params }) {
  const { slug } = params || {};
  const { eventdetails } = await GlobalApi.fetchHygraphEventDetailsBySlug(String(slug));

  if (!eventdetails || eventdetails.length === 0) {
    notFound();
  }

  const event = eventdetails[0];
  const cleanAbout = event.about ? event.about.replace(/[“”]/g, '"') : '';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        {event.images && event.images.length > 0 ? (
          <>
            <Image
              src={event.images[0].url}
              alt={`Image for ${event.name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/50 to-black"></div>
        )}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex items-center justify-between">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
            {event.name}
          </h1>

          {/* Browse Movies Button */}
          {slug === 'movies' && (
            <Link
              href="/MoviesBooking"
              className="px-6 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
            >
              Browse Movies
            </Link>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-white/5 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-8 md:p-12">
          {cleanAbout ? (
            <div className="space-y-6">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-pink-400">
                <Info size={28} />
                About The Event
              </h2>
              <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
                {cleanAbout}
              </p>
            </div>
          ) : (
            <p className="text-white/70 text-lg">No description available for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
}
